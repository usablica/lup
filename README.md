Lup
===

> Easy to use CSS3 transition manager

**Lup** is a lightweight and easy to use library to manage and control CSS3 transition. 

## Hello world

```javascript
//take `#test` element, add `green` css class and wait for 2 seconds, then remove all css classes
lup("#test").add('green').wait(2000).end();
``` 

## API

###lup(targetElement)

To create lup object.

**Available since**: v0.1.0

**Parameters:**
 - targetElement: String or Object  
   Can be both css selector or DOM object

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test');

lup(document.querySelector('#test'));
````

###lup.add(className)

Adds given CSS class name to the target element

**Available since:** v0.1.0

**Parameters:**
 - className: String

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green').end();
```

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
lup('#test').add('green').remove().end(); /* Removes `green` class */
lup('#test').add('green').remove('green').end(); /* Same as previous line, removes `green` class */
lup('#test').add('green').add('red').remove().end(); /* Removes `red` class */
```

-----

###lup.then([fn])

Wait for completing last operation, CSS3 transition for example.

**Available since:** v0.1.0

**Parameters:**
 - fn: Function (optional)

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green').then().add('red').end(); /* Adds `green` and then after completing `green` class transition, adds `red` class */
lup('#test').add('green').then(function(){ alert('green completed!') }).end(); /* Adds `green`, shows `alert` after completing transition*/
```

-----

###lup.wait(milliseconds)

Wait and then execute next operation.

**Available since:** v0.1.0

**Parameters:**
 - milliseconds: Number

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green').wait(1000).add('red').end(); /* Adds `green` and after one second adds `red` class */
```

-----

###lup.end([fn])

Execute the operations. 

**Available since:** v0.1.0

**Parameters:**
 - fn: Number

**Returns:**
 - lup object.

**Example:**
```javascript
lup('#test').add('green').end(); /* Adds `green` css class */
```

-----

###lup.option(option, value)

Set a single option to lup object.

**Available since**: v0.1.0

**Parameters:**
 - option : String
   Option key name.

 - value : String/Number
   Value of the option.

**Returns:**
 - lup object.

**Example:**
```javascript
lup("#test").add('green').option('cleanup', false).end();
````

----

###lup.options(options)

Set a group of options to the lup object.

**Available since**: v0.1.0

**Parameters:**
 - options : Object
   Object that contains option keys with values.

**Returns:**
 - lup object.

**Example:**
```javascript
lup("#test").add('green').options({ 'cleanup': false }).end();
````

----

###Options:

 - `cleanup`: `Boolean` and `true` by default - Clean all css classes at the end of timeline?

*Note:* You can alter options using `option` and `options` methods.

## Roadmap
- Support more than one target element
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
