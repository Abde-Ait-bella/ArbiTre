# ArbiTre - Backend API

ArbiTre est une application pour les arbitres qui facilite la gestion des rapports et la coordination des matches.

## Configuration des notifications d'inscription

Ce projet inclut un système de notification qui alerte l'administrateur lorsqu'un nouvel utilisateur s'inscrit. Les notifications sont envoyées par email et WhatsApp.

### Configuration des emails

1. Modifiez votre fichier `.env` et configurez les paramètres email :
```
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-server
MAIL_PORT=587
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=no-reply@arbitre.com
MAIL_FROM_NAME=ArbiTre

# Email de l'administrateur qui recevra les notifications
ADMIN_EMAIL=your-admin-email@example.com
```

### Configuration WhatsApp (via CallMeBot)

1. Pour recevoir des notifications WhatsApp, ajoutez votre numéro WhatsApp dans le fichier `.env` :
```
ADMIN_WHATSAPP_NUMBER=+212XXXXXXXXX
```

2. Pour obtenir votre API key CallMeBot:
   - Suivez les instructions sur [ce lien](https://www.callmebot.com/blog/free-api-whatsapp-messages/)
   - Envoyez un message WhatsApp à l'API: "I allow callmebot to send me messages" au numéro +34 644 15 32 47
   - Attendez de recevoir votre API key par WhatsApp
   - Ajoutez cette API key dans votre fichier `.env` :
```
CALLMEBOT_API_KEY=your-api-key-here
```

> Note : Par défaut, les messages WhatsApp sont uniquement enregistrés dans les logs. Pour activer l'envoi réel, décommentez le code approprié dans `WhatsAppService.php`.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
