rocketz
=======

Old-school game. Here is the [link](http://www.youtube.com/watch?v=SnAIuJsBQKQ).

Sometimes to recall an oldschool stuff it's just easier to remake it.

## Project structure

1. etc - system configurations (like nginx, uwsgi, etc)
2. rocketzd - real time battle server libs
3. static - static files (js, png, css, ...)
4. web - django project for rendering index page
5. templates - django templates

## Installing

    virtualenv .env
    source .env/bin/activate
    pip install -r requrements.txt

On Mac

    brew install nodejs
    curl https://npmjs.org/install.sh | sh

## Running

Currently in dev mode using django runserver

1. Start game greenlets 
    
    ./rctl start --fg

2. Start django to serve static 
    
    ./manage.py runserver




