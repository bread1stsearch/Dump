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
    5. For async functionality:
        npm install babel-polyfill --save
        
In DumpProject/Dump, run the following:
    python manage.py migrate
    python manage.py runserver
    
For Windows:
    1. add pip.exe/pip3.exe to %PATH% - setx PATH="%PATH%;C\path\to\folder\containing\executable"
    2. pip install djangorestframework in Dump/Dump/topics/
    

FRONTEND RESOURCES:=========================================================================================
React Hooks: https://reactjs.org/docs/react-component.html#componentdidupdate

setState: https://medium.com/@agm1984/reacts-setstate-is-a-special-function-and-it-helps-with-asynchronous-concurrency-669eddbe3dd1

React Forms: 
- https://reactjs.org/docs/forms.html
- https://facebook.github.io/react-native/docs/handling-text-input

Checkbox Component:
https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd

Conditional Rendering:
https://reactjs.org/docs/conditional-rendering.html


BACKEND - DJANGO -  RESOURCES:=========================================================================================
Serializers: https://www.django-rest-framework.org/api-guide/serializers/#serializing-objects
Serializer - Nested Relationships - https://www.django-rest-framework.org/api-guide/relations/

For problem:
    when serializing nested objects that refer to each other, how to create the serializer for it?
    
For problem:
    when sending a non-model field in content, use the internal_data method to add this field
    reference:
    https://stackoverflow.com/questions/30665220/unable-to-get-a-non-model-field-in-the-validated-data-of-a-django-rest-framework/33247673
    
https://www.django-rest-framework.org/tutorial/1-serialization/
https://www.django-rest-framework.org/tutorial/2-requests-and-responses/
