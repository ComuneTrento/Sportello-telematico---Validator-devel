# Validator Devel

this is the frontend dashboard for build module with GLOBO SRL technologies.

Is built with Python and React for the frontend, python is acting as a web server, the react is the frontend that consume the API.

## Install
Only Python 3 is required as a user, this software is currently hosted on [PyPi](https://pypi.org/project/validator-devel/) so you can install it with:
`pip install validator-devel` and call in your terminal of choice `validator-devel` for the execution.

If you want to contribute you need these tools for the frontend compilation:
* Node 10.x
* yarn



## Build the project

The project has two different method of build, the first one is use Node for build the frontend and put the result where python can find for serve it.

#### Frontend build

```bash
cd frontend
yarn build
```

#### Python environment

Please consider use virtual environents for the installation:
```bash
pip install -r requirements.txt
python validator_devel/main.py
```

## Configuration

On startup validator-devel check for the config file, if isn't set create a 'vanilla' settings file in the system application folder (depends on your OS settings).

If you need edit this file once is created run:
```
validator-devel --config
```

This will open the file with the predefined editor for YAML files, there are some configuration that can help the module designer to fix some missing api or test different version of Validator.

* `modules_path`: the path where all modules are stored.
* `validator_path`: the path where Validator version 1 can be found.
* `stu3_validator_path`: the path where Validator 2 (AngularJS version) can be found.
* `stu3_base`: The basic template where STU3 module are inserted, you can change this for better error showing, or include news CSS, or test other controllers.
* `urls`: this section allow the user for define custom URL for mock modules API, or WebService integration, proxied request are supported as well so you can integrate with your existing service.

#### Urls settings

The URL are an advanced feature, basic configuration allow you to response some static JSON or text and custom headers, for example:
```
    /rest/session/token:
      headers:
        Content-Type: text/plain
      body: BzPKG0MLwRNRtuH6UTYzzQFEb7jwMAhJGWemsmNVdzQ
```

Every request to `/rest/session/token` on validator-devel response with the body and the headers specified in the configurations, by default the content type is `application/json`.

For handling more complicated request like dynamic response or different method support (POST, GET, PUT...) you can use proxy!
```
/proxy/test: http://example.com
```

All request to `/proxy/test` are routed to the specified URL, where you can mockup you service.