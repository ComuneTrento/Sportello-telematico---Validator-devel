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

This will open the file with the predefined editor for YAML files.
