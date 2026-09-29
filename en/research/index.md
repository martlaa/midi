---
layout: "default"
lang: "en"
title: "Research"
intro: "We study the learning and teaching of mathematics and informatics, and teachers’ professional development."
section: "research"
permalink: "/en/research/"
translation: "/et/research/"
other_lang: "et"
---
{% assign lang = page.lang %}
{% for area in site.data.research %}
<section class="prose-section" id="{{ area.id }}">
<div><p class="eyebrow">0{{ forloop.index }}</p><h2>{{ area.title[lang] }}</h2></div>
<div><p class="lead">{{ area.summary[lang] }}</p><p>{{ area.body[lang] }}</p></div>
</section>
{% endfor %}
