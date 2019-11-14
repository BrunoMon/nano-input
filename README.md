
# @BrunoMon/nano-input

![npm](https://img.shields.io/npm/v/@brunomon/nano-input)
![GitHub issues](https://img.shields.io/github/issues/brunomon/nano-input)
![GitHub](https://img.shields.io/npm/l/@brunomon/nano-input)

lit-element input

## Install

```
$ npm install @brunomon/nano-input
```

## Usage

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Prueba</title>
</head>
<style>
    html {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.5vmin;

        --primary-color: #7b1fa2;
        --primary-color-variant: #ae52d4;

        --secondary-color: #e64a19;
        --secondary-color-variant: #ff7d47;

        --background-color: #ffffff;
        --surface-color: #ffffff;
        --error-color: #B00020;

        --onprimary-color: #ffffff;
        --onprimary-color-variant: #000000;

        --onsecondary-color: #000000;
        --onsecondary-color-variant: #ffffff;

        --onbackground-color: #000000;

        --onsurface-color: rgba(0, 0, 0, .87);
        --onsurface-color-helper: rgba(0, 0, 0, .60);
        --onsurface-color-disable: rgba(0, 0, 0, .38);

        --onerror-color: #ffffff;
    }

    body {
        padding: 1rem;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, .3);


    }

    .card {
        width: 50vmin;
        display: grid;
        grid-gap: 2rem;
        background-color: var(--background-color);
        padding: 1rem
    }

    nano-input {
        background-color: rgba(0, 0, 0, .1);
        color: var(--onsurface-color);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;

    }

    nano-input[type="button"] {
        width: 8rem;
        border-radius: .5rem;
        overflow: hidden
    }
</style>

<body>
    <div class="card">
        <nano-input label="Texto" helper="* requerido" id="input1"></nano-input>
        <nano-input label="Numero" helper="* entre 10 y 20" type="number" value="2" id="input2"></nano-input>
        <nano-input label="Fecha Hora" type="datetime-local" id="input3"></nano-input>
        <nano-input label="Fecha" type="date"></nano-input>
        <nano-input label="Password" type="password"></nano-input>
        <nano-input label="E-mail" type="email"></nano-input>
        <nano-input label="Este es el checkbox" type="checkbox" id="inputCheck"></nano-input>
        <nano-input label="VALIDAR" type="button" value="" id="boton"></nano-input>
    </div>


</body>
<script>
    document.getElementById("input1").addEventListener("validating", (e) => {
        e.currentTarget.errorText = !e.currentTarget.empty ? "" : "* No debe ser vacio"
    })

    document.getElementById("input2").addEventListener("validating", (e) => {
        const valor = parseInt(e.currentTarget.value)
        e.currentTarget.errorText = (valor >= 10 && valor <= 20) ? "" : "* debe estar entre 10 y 20"
    })

    document.getElementById("inputCheck").leadingIcon = null

    document.getElementById("boton").onclick = validate

    function validate() {
        let isValid = Array.prototype.slice.call(document.querySelectorAll("nano-input")).reduce((isValid, item) => {
            item.validate()
            isValid = isValid && item.isValid
            return isValid
        }, true)
        if (isValid) {
            alert("OK")
        }

    }
</script>

</html>
```
