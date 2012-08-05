rocketz
=======

Old-school game. Here is the [link](http://www.google.ru/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;ved=0CGsQtwIwAQ&amp;url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DSnAIuJsBQKQ&ei=PPweUIH3Bca6hAfBkoDYBQ&amp;usg=AFQjCNGTyF654OWg2rvUizwfZb9F7pmlaA&amp;sig2=NdhrNk5pNOnrZfoaKi1Uiw)
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

## Running

Currently in dev mode using django runserver

    1. Start game greenlets /rctl rs start --fg

    2. Start django to serve static ./web/manage.py runserver




