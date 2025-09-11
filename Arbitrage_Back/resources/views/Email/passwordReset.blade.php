@component('mail::message')
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
</style>

<div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; text-align:end; margin-bottom:24px;">
    <a href="https://arbitre.ma">
        <img src="{{ $message->embed(public_path('/images/logo_red.png')) }}" alt="arbitre.ma logo"
            style="width:120px; margin-bottom:16px;">
    </a>
</div>

<div dir="rtl"
    style="font-family: 'Cairo', Arial, sans-serif; background:#fbab00; color:#fff; border-radius:8px; padding:18px 24px; font-size:1.1rem; margin-bottom:24px; text-align:right;">
    <span style="font-weight:500;">إضغط على الزر أسفله لتعيين كلمة سر من جديد</span>
</div>

<div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; text-align:center; margin-bottom:32px;">
    <a href="{{ env('APP_URL', 'https://arbitre.ma') . '/password-reset/' . $token . '/' . $email }}"
        style="background:#dc3545; color:#fff; padding:12px 32px; border-radius:6px; font-size:1.1rem; font-weight:600; text-decoration:none; display:inline-block; box-shadow:0 2px 8px rgba(220,53,69,0.12);">
        إضغط هنا
    </a>
</div>

<div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; text-align:center; color:#888; font-size:0.95rem;">
    شكرا<br>
    <img src="{{ $message->embed(public_path('/images/logo_red.png')) }}" alt="arbitre.ma logo"
        style="width:4rem; margin-bottom:16px;">
</div>
@endcomponent