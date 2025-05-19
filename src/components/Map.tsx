
import React from 'react';

// Default location for "вул. Левка Лук'яненка, 21, корпус 3, офіс 7"
const DEFAULT_ADDRESS = "вул. Левка Лук'яненка, 21, корпус 3, офіс 7, Київ, Україна";

const Map = () => {
  return (
    <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.0732708086186!2d30.51425880000001!3d50.4519218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cd0dc3eecc05%3A0xdce2a0cd34f38c18!2z0LLRg9C7LiDQm9C10LLQutCwINCb0YPQuifRj9C90LXQvdC60LAsIDIxLCDQmtC40ZfQsiwgMDQyMDc!5e0!3m2!1suk!2sua!4v1716119417372!5m2!1suk!2sua"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ Location"
      ></iframe>
    </div>
  );
};

export default Map;
