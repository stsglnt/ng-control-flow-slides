---
theme: seriph
background: assets/road.jpg
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template

drawings:
  persist: false
transition: slide-left
title: Angular New Control Flow
---

# Angular New Control Flow
  <div class="abs-br" style="bottom: 20px; right: 20px; display: flex; flex-flow: column; align-items: flex-end">  
    <img src="assets/me.png" class="w-15 h-15 rounded shadow" />
    <div>Stanislav Galiant</div>
    <div style="font-size: 12px">Angular FE developer at <i>Cluepoints</i></div>
  </div>

  <div class="abs-tr m-6 flex gap-2">
    <a href="https://github.com/stsglnt" target="_blank" alt="GitHub"
      class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
      <carbon-logo-github />
    </a>
  </div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: fade-out
---

# What is angular new control flow ?

<div grid="~ cols-2 gap-4">
<div>

```html
<div *ngIf="condition"></div>



<li *ngFor="let item of items; trackBy: trackByFn"></li>



<div [ngSwitch]="condition">
  <div *ngSwitchCase="condition_one">...</div>
  <div *ngSwitchDefault>...</div>
</container-element>
```

</div>
<div>

```html
@if (condition) {
    <div></div>
}

@for (item of items; track item.id) {
    <li></li>
}

@switch (condition) {
  @case (Conditions.One) {
      <div></div>
  }
  @default {
      <div></div>
  }
}
```

<arrow v-click x1="300" y1="117" x2="500" y2="117" color="#564" width="1" arrowSize="1" />
<arrow v-click x1="470" y1="189" x2="500" y2="189" color="#564" width="1" arrowSize="1" />
<arrow v-click x1="300" y1="260" x2="500" y2="260" color="#564" width="1" arrowSize="1" />

</div>
</div>
<br>

---
layout: default
---

# Why do we need new control flow ?

1. The existing control flow is based on directives that depend on the `ngDoCheck` lifecycle hook, which, in turn, is tied to zone.js. Thus, they would not be able to function in a zoneless application.

2. New control flow is an in-built approach (no need for CommonModule/NgIf... imports).

3. Slightly improves performance (forces trackBy, no additional structural directives logic).


---
layout: default
---

# Some additional benefits

1. `@if` now has `@empty` syntax.
2. `@if` comes with `@else` and `@else if` eliminating the need for `ng-template` and template variable.
3. `@switch` has better type-checking and does all that normal ts switch does (for example narrowing union type) 

---
transition: slide-up

level: 2
---

# Things to keep in mind

1. Existing usages of `@` and `}` as literal characters in templates will need to be escaped via a migration
   `\&#64;` for `@`, `\&#123;` for `{`, and `\&#125;` for `}`
2. `track` is now required (maybe except for Iterable\<Signal\<unknown\>\> where, in fact, it will be not allowed)
3.  Aliasing only supported for zone components (key word 'as') (Because signals are synchronous and side effect free, there is no harm in reading their value in multiple places)

---
layout: image-right
image: assets/watch.jpeg
---

# Deferrable Views

<br> 
<h3 style="color: #5b5959; margin-bottom: 20px;">@defer</h3> 
<h3 style="color: #5b5959; margin-bottom: 20px;">@loading</h3> 
<h3 style="color: #5b5959; margin-bottom: 20px;">@placeholder</h3> 
<h3 style="color: #5b5959; margin-bottom: 20px;">@error</h3> 


---
layout: default
---
<style>
   table {
      font-size: 15px;
   }
</style>
# @defer

<table>
  <tr>
    <th>Trigger</th>
    <th>Detail</th>
  </tr>
  <tr>
    <td>when isVisible</td>
    <td>This condition precedes the triggers. It can be a variable, a function call, a piped value etc.
Observable and the AsyncPipe are not supported at the time of writing</td>
  </tr>
  <tr>
    <td>on idle</td>
    <td>This the default behavior, it fires when the app idles (with requestIdleCallback)</td>
  </tr>
  <tr>
    <td>on immediate</td>
    <td>The trigger fires immediately when the template is executed</td>
  </tr>
  <tr>
    <td>on timer(5s)</td>
    <td>A setTimeout based trigger, in milliseconds or seconds if s is specified</td>
  </tr>
  <tr>
    <td>on interaction(trigger)	</td>
    <td>On click on a template reference where #trigger is a template reference</td>
  </tr>
  <tr>
    <td>on hover(trigger)</td>
    <td>On hover on a template reference, where #trigger is a template reference</td>
  </tr>
  <tr>
    <td>on viewport(container)	</td>
    <td>On a template entering the viewport, where #container is a template reference</td>
  </tr>
</table>

---
layout: default
---

# @placeholder, @loading, @error

 Things to keep in mind:

1. The content of the `@placeholder`, `@loading` and `@error` blocks are eagerly loaded.
2. The `minimum` timer for the `@placeholder` block begins after the initial render of this `@placeholder` block completes.
3. Both the `minimum` and `after` timers for the `@loading` block begins immediately after the loading has been triggered.


---
layout: default
---

# Corner cases

<div grid="~ cols-2 gap-4">
<div>

```html
   @defer { // Block A 
    @if (option === 'a') {
     <heavy-component-a />
    } @else if (option === 'b') {
     <heavy-component-b />
    } @else {
        @defer { // Block B
          <heavy-component-c />     
        }      
     }
    }
```

</div>

<div>

```ts
function defer_for_blockA {
    return [
       () => import('./heavy-component-a'),
       () => import('./heavy-component-b')
    ]
}

function defer_for_blockB {
    return [
       () => import('./heavy-component-c')
    ]
}
```

</div>
</div>



---
layout: default
---

# Corner cases

<div grid="~ cols-2 gap-4">
<div>

```html
@for (item of items) {
    @defer {
        <my-heavy-component />
    }
}
```

</div>

<div>

```html
@defer {
   @for (item of items) {
      <my-heavy-component />
   }
}
```

</div>
</div>
<br>
<div v-click grid="~ cols-2 gap-4">
<div>
   <h4>@defer inside of @for</h4>
   <ul>
      <li>items.length * 2 embedded views</li>
      <li>items.length defer block instances</li>
   </ul>
</div>

<div>
   <h4>@for inside of @defer</h4>
   <ul>
      <li>items.length embedded views</li>
      <li>A single defer block instances</li>
   </ul>
</div>
</div>


---
layout: center
class: text-center
---

# Thank you
<img src="assets/ng-logo.gif" style="width: 150px; height: 150px">

<div class="abs-bl" style="left: 20px; bottom: 20px"> 
Useful links:
   <ul>
      <li>
       <a href="https://riegler.fr/blog/2023-10-05-defer-part1">
         https://riegler.fr/blog/2023-10-05-defer-part1
       </a>
      </li>
      <li>
       <a href="https://riegler.fr/blog/2023-10-08-defer-part2">
         https://riegler.fr/blog/2023-10-08-defer-part2
       </a>
      </li>
      <li>
       <a href="https://blog.ninja-squad.com/2023/10/11/angular-control-flow-syntax/">
         https://blog.ninja-squad.com/2023/10/11/angular-control-flow-syntax/
       </a>
      </li>
   </ul>
</div>



