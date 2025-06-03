
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to escape special characters for Telegram Markdown
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, expertise, message } = await req.json();
    
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    
    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
    }

    // Format message for Telegram (escape special characters)
    const telegramMessage = `
🏢 *Нова заявка з сайту NISE*

👤 *Ім'я:* ${escapeMarkdown(name)}
📧 *Email:* ${escapeMarkdown(email)}
📞 *Телефон:* ${escapeMarkdown(phone)}
🔍 *Тип експертизи:* ${escapeMarkdown(expertise)}

💬 *Повідомлення:*
${escapeMarkdown(message)}

⏰ *Час подачі:* ${escapeMarkdown(new Date().toLocaleString('uk-UA'))}
    `;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send message to Telegram');
    }

    console.log('Message sent successfully to Telegram');

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in contact-form function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
