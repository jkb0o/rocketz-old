rocketz
=======

Old-school game.

## Project structure

1. etc - system configurations (like nginx, uwsgi, etc)
2. rocketzd - real time battle server libs
3. static - static files (js, png, css, ...)
4. web - django project for rendering index page
5. templates - django templates

## Installing

> virtualenv .env
> source .env/bin/activate
> pip install -r requrements.txt

## Running

Currently in dev mode using django runserver
> ./web/manage.py runserver




