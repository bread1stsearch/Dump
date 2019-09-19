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

In DumpProject/Dump, run the following:
    python manage.py migrate
    python manage.py runserver