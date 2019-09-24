# Dump

Set up webpack - will create folder node_modules:
In DumpProject/Dump, run the following:
    0. Init
        npm init -y
    1. Install webpack
        npm i webpack webpack-cli --save-dev
    2. Install babel
        npm i @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --save-dev
    3. Install React/Prop-Types
        npm i react react-dom prop-types --save-dev
    4. For CSRF
        npm install js-cookie --save
        https://www.techiediaries.com/django-react-forms-csrf-axios/
        
In DumpProject/Dump, run the following:
    python manage.py migrate
    python manage.py runserver
    
For Windows:
    1. add pip.exe/pip3.exe to %PATH% - setx PATH="%PATH%;C\path\to\folder\containing\executable"
    2. pip install djangorestframework in Dump/Dump/topics/
    
