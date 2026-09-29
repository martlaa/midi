---
layout: "default"
lang: "et"
title: "Teadustöö"
intro: "Uurime matemaatika ja informaatika õppimist, õpetamist ning õpetajate professionaalset arengut."
section: "research"
permalink: "/et/research/"
translation: "/en/research/"
other_lang: "en"
---
{% assign lang = page.lang %}
{% for area in site.data.research %}
<section class="prose-section" id="{{ area.id }}">
<div><p class="eyebrow">0{{ forloop.index }}</p><h2>{{ area.title[lang] }}</h2></div>
<div><p class="lead">{{ area.summary[lang] }}</p><p>{{ area.body[lang] }}</p></div>
</section>
{% endfor %}
