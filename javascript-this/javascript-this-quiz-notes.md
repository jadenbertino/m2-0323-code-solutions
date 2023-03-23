# javascript-this-quiz-notes

## Quiz Questions

After completing this exercise, you should be able to discuss or answer the following questions:

- What is `this` in JavaScript?

- What does it mean to say that `this` is an "implicit parameter"?

- _When_ is the value of `this` determined in a function; **call time** or **definition time**?

- What does `this` refer to in the following code snippet?
    ```js
    const character = {
      firstName: 'Mario',
      greet: function () {
        const message = 'It\'s-a-me, ' + this.firstName + '!';
        console.log(message);
      }
    };
    ```

- Given the above `character` object, what is the result of the following code snippet? Why?
    ```js
    character.greet();
    ```

- Given the above `character` object, what is the result of the following code snippet? Why?
    ```js
    const hello = character.greet;
    hello();
    ```

- How can you tell what the value of `this` will be for a particular function or method **definition**?

- How can you tell what the value of `this` is for a particular function or method **call**?


## Notes

All student notes should be written here.


How to write `Code Examples` in markdown

for JS:
```javascript
const data = "Howdy"
```

for HTML:
```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:
```css
div {
  width:100%
}
```
