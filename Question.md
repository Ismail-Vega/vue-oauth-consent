# Question

Explain how you would optimize for performance of a Vue.js based application that renders a large list of items (e.g: 10,000 rows in a table). What techniques/Vue.js features would you use to ensure smooth scrolling and responsiveness? Please be as detailed as possible.

## Answer

If you’re trying to render thousands of DOM nodes, you're gonna choke the browser.  
Solution? I use a virtual scroller (windowing). Only render what's visible in the view-box.

### Libraries I use

I always try to have only around 30 items ever in the DOM

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [@tanstack/vue-virtual](https://github.com/TanStack/virtual)

### Code optimization

1. I try to not use watchers unless necessary.
2. Same for computed props (Memoization should be used wisely. I use `shallowRef`, `markRaw`, or `reactive` only where needed).
3. No unnecessary reactivity (when used selectively you can get high performance out of the box).
4. Use unique and consistent keys for `v-for`.
5. When pagination is necessary and search/filter is used, I try to use lazy load and cache loaded pages.
6. Debounce inputs or throttle scroll/resize events to avoid hitting the backend unnecessarily or triggering expensive calculations (I’ll throw a ref in, debounce it with lodash or a `watchEffect`, then recompute).
7. I mark computed props with big list dependencies as shallow or lazy.
8. I avoid `v-if` in lists — using conditions inside a `v-for` triggers too many re-renders. Instead, I prefer to filter the items beforehand and just loop unconditionally.
9. I benefit from code splitting by marking the big list component as lazy-loaded.

    ```js
    const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'));
    ```

    Or route-level split via Vue Router:

    ```js
    {
      path: '/massive-page',
      component: () => import('./views/Massive.vue')
    }
    ```

10. Lastly, I would do image optimization to support lists that contain cards/images.

    I do:
    - Serve modern formats (WebP/AVIF)
    - Compress everything
    - Use `<img loading="lazy">`
    - Use `srcset` or `<picture>` to avoid loading 2K images on mobile

Also, if the list has avatars/thumbnails?  
I wrap `img` tags in a skeleton loader or blur-up placeholder to reduce layout jank.

### Other checks

1. I use Chrome DevTools (Performance tab) to watch performance metrics.
2. Vue Devtools.
3. I would check if server-side rendering would be a good solution for my use case.
