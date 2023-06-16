const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const viberBot = new ViberBot({
    authToken: '51310a6bba67e1df-c82ff9c22f05f3ea-819647e0d27e2e5c',
    name: 'iTGin',
    avatar: 'https://url.to/avatar.jpg'
});

app.use('/viber/webhook', viberBot.middleware());

viberBot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    if (message.text === '/start') {
        response.send([
            {
                "text": "Привіт! Як тебе звати?"
            }
        ]);
    } else if (message.text === 'Привіт') {
        response.send([
            {
                "text": "Вітаю, {user_name}! Введи, будь ласка, свій номер телефону."
            }
        ]);
    } else if (message.text.startsWith('+')) {
        const phone = message.text;
        response.send([
            {
                "text": "Чи тобі потрібне програмне забезпечення для продажів?",
                "keyboard": {
                    "Type": "keyboard",
                    "DefaultHeight": true,
                    "Buttons": [
                        {
                            "Text": "Так",
                            "ActionType": "reply",
                            "ActionBody": "yes"
                        },
                        {
                            "Text": "Ні",
                            "ActionType": "reply",
                            "ActionBody": "no"
                        }
                    ]
                }
            }
        ]);
    } else if (message.text === 'Так') {
        response.send([
            {
                "text": "Ось список доступного програмного забезпечення для продажів:",
                "keyboard": {
                    "Type": "keyboard",
                    "DefaultHeight": true,
                    "Buttons": [
                        {
                            "Text": "Інтернет магазин - $5000",
                            "ActionType": "reply",
                            "ActionBody": "internet_shop"
                        },
                        {
                            "Text": "Лендінг - $100-1000",
                            "ActionType": "reply",
                            "ActionBody": "landing_page"
                        },
                        {
                            "Text": "Чат-бот - $100-1000",
                            "ActionType": "reply",
                            "ActionBody": "chatbot"
                        }
                    ]
                }
            }
        ]);
    } else if (message.text === 'Ні') {
        response.send([
            {
                "text": "Дякую за увагу! Будь ласка, зверніться до нас, якщо виникнуть будь-які питання."
            }
        ]);
    } else if (message.text === 'Інтернет магазин - $5000' || message.text === 'Лендінг - $100-1000' || message.text === 'Чат-бот - $100-1000') {
        console.log(`Користувач: ${message.sender.name}`);
        console.log(`Номер телефону: ${phone}`);
        console.log(`Вибір: ${message.text}`);
        response.send([
            {
                "text": "Дякуємо за вибір! Ми з вами зв'яжемось найближчим часом."
            }
        ]);
    }
});

viberBot.setWebhook('https://914c-46-211-166-40.ngrok-free.app').then(() => {
    console.log('Вебхук встановлено');
}).catch((error) => {
    console.log('Помилка встановлення вебхука:', error);
});

viberBot.on(BotEvents.ERROR, (error) => {
    console.error('Помилка:', error);
});

app.listen(port, () => {
    console.log(`Бот запущений на порту ${port}`);
});
