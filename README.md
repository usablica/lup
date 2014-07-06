Lup
===

> Easy to use CSS3 transition manager

**Lup** is a lightweight and easy to use library to manage and control CSS3 transition. 

## Hello world

```
lup("#test").add('green').wait(2000).end();
```

## API

###lup.add(className)

Adds given CSS class name to the target element

**Available since:** v0.1.0

**Parameters:**
 - className: String

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green');
````

-----

###lup.remove([className])

Removes given CSS class name from target element 

**Available since:** v0.1.0

**Parameters:**
 - className: String (optional)

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green').remove(); /* Removes `green` class */
lup('#test').add('green').remove('green'); /* Same as previous line, removes `green` class */
lup('#test').add('green').add('red').remove(); /* Removes `red` class */
````

-----

## Roadmap
- Support 
- Add more examples

## Release History

 * **v0.1.0** - 2014-06-06
   - Initial version

## Author
**Afshin Mehrabani**

- [Twitter](https://twitter.com/afshinmeh)
- [Github](https://github.com/afshinm)
- [Personal page](http://afshinm.name/)

## License
> Copyright (C) 2014 Afshin Mehrabani (afshin.meh@gmail.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions
    of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.
