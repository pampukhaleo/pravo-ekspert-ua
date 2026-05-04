import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.9";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

// Validation patterns
const NAME_REGEX = /^[A-Za-zА-ЯЁа-яёҐЄІЇґєії'\s-]{2,100}$/u;
const PHONE_REGEX = /^(\+?38)?0\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation function
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check honeypot field
  if (data.website && data.website.trim() !== '') {
    console.log('🚨 Honeypot triggered - bot detected');
    return { valid: false, errors: ['Invalid submission'] };
  }
  
  // Check submission time (minimum 3 seconds)
  if (data._submitTime && data._submitTime < 3000) {
    console.log('🚨 Form submitted too quickly:', data._submitTime, 'ms');
    return { valid: false, errors: ['Submission too fast'] };
  }
  
  // Validate name
  if (!data.name || !NAME_REGEX.test(data.name)) {
    errors.push("Invalid name format");
  }
  
  // Validate email
  if (!data.email || !EMAIL_REGEX.test(data.email) || data.email.length > 255) {
    errors.push("Invalid email format");
  }
  
  // Validate phone
  if (!data.phone || !PHONE_REGEX.test(data.phone)) {
    errors.push("Invalid phone format");
  }
  
  // Validate subject
  if (!data.subject || data.subject.trim().length < 3 || data.subject.length > 200) {
    errors.push("Invalid subject");
  }
  
  // Validate message
  if (!data.message || data.message.trim().length < 10 || data.message.length > 2000) {
    errors.push("Invalid message");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    // Get the Telegram bot token and chat ID from environment variables
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing Telegram configuration");
    }
    
    // Parse the request body to get form data
    const formData = await req.json();
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.valid) {
      console.error('❌ Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed",
          details: validation.errors 
        }), 
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    const { name, email, subject, message, phone, companyName } = formData;
    const site = companyName || "Unknown site";
    
    console.log('✅ Valid submission received from:', site);

    // Save lead to database (using service role to bypass RLS)
    try {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (SUPABASE_URL && SERVICE_ROLE) {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
        const { error: dbError } = await admin.from("leads").insert({
          name,
          email: email || null,
          phone,
          address: subject, // form has no address; use subject as required field placeholder
          description: message,
          source: site,
        });
        if (dbError) console.error("DB insert error:", dbError);
      }
    } catch (e) {
      console.error("Lead save failed:", e);
    }

    // Format message for Telegram
    const telegramMessage = `
📨 Нове повідомлення з сайту: ${site}
      
👤 Ім'я: ${name}
✉️ Email: ${email}
📞 Телефон: ${phone}
📝 Тема: ${subject}
📄 Повідомлення: ${message}
    `;
    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML"
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error(`Failed to send message to Telegram: ${response.statusText}`);
    }
    // Return success response
    return new Response(JSON.stringify({
      success: true
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 200
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({
      error: "Internal server error"
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 500
    });
  }
});
