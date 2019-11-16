const sortingVisualize = (function() {

    const COLOR_CODE = '#000';
    const COMPARE_COLOR = '#55FD07';
    const SWAP_COLOR = '#8C0AF1';
  
    function randint(min, max) {
      // Return a random integer 
      return min + Math.floor((max - min + 1) * Math.random());
    }
  
    function draw(canvas, array, color) {
      /*
       * Draw on a canvas.
       *
       */
      let width = 2;
      let ctx = canvas.getContext('2d');
  
      // Clear the canvas
      ctx.fillStyle = '#19E7D7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Find min and max elements
      let min = array[0];
      let max = array[0];
      for (let i = 1; i < array.length; i++) {
        min = array[i] < min ? array[i] : min;
        max = array[i] > max ? array[i] : max;
      }
  
      // Figure out width of bars and spacing
      let n = array.length;
      let spacing = canvas.width / (width * n + n + 1);
      let bar_width = spacing * width;
  
      // Draw a box around the outside of the canvas
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
      function convert(y) {
        let i = canvas.height / (min - max);
        let j = max * canvas.height / (max - min);
        return i * y + j;
      }

      let baseline = convert(0);
      ctx.beginPath();
      ctx.moveTo(0, baseline);
      ctx.lineTo(canvas.width, baseline);
      ctx.stroke();
  
      // draw columns
      let x = spacing;
      for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = color[i];
        let y = convert(array[i]);
        if (array[i] >= 0) {
          ctx.fillRect(x, y, bar_width, baseline - y);
        } else {
          ctx.fillRect(x, baseline, bar_width, y - baseline);
        }
        x += spacing + bar_width;
      }
    }
    // main function
    function Animate(array, canvas, interval) {
      this._array = array;
      this._canvas = canvas;
      this._array_display = [];
      this._color = [];
      this._actions = [];
      for (let i = 0; i < array.length; i++) {
        this._array_display.push(array[i]);
        this._color.push(COLOR_CODE);
      }
      draw(this._canvas, this._array, this._color);
      let _this = this;
      this._id = window.setInterval(function() {_this._step();}, interval);
    }
    
    Animate.prototype.kill = function() {
      /*
       * kill animations for any pending actions for this Animate.
       */
      window.clearInterval(this._id);
    }
  
     /** 
       * @description Compare the elements at indices i and j.
       *
       * this.compare(i, j) > 0 if this._array[i] > this._array[j].
       */
    Animate.prototype.compare = function(i, j) {
     
      this._actions.push(['compare', i, j]);
      return this._array[i] - this._array[j];
    }

     /** 
       * @description Check whether this._array[i] is less than this._array[j].
       */

    Animate.prototype.lessThan = function(i, j) {

      return this.compare(i, j) < 0;
    }
    /**
       * @description Swap this._array[i] and this._array[j].
       */
    Animate.prototype.swap = function(i, j) {
      
      this._actions.push(['swap', i, j]);
      let t = this._array[i];
      this._array[i] = this._array[j];
      this._array[j] = t;
    }
  
     /** 
       * Consumes one step from the action buffer, using it to update
       * the display version of the array and the color array; then
       * draws the display array to the canvas. You should not call this
       * manually.
       */
    Animate.prototype._step = function() {
     
      if (this._actions.length === 0) {
        draw(this._canvas, this._array_display, this._color);
        return;
      }
      let action = this._actions.shift();
      let i = action[1];
      let j = action[2];
      if (action[0] === 'compare') {
        this._color[i] = COMPARE_COLOR;
        this._color[j] = COMPARE_COLOR;
      } else if (action[0] === 'swap') {
        this._color[i] = SWAP_COLOR;
        this._color[j] = SWAP_COLOR;
        let t = this._array_display[i];
        this._array_display[i] = this._array_display[j];
        this._array_display[j] = t;
      }
      draw(this._canvas, this._array_display, this._color);
      this._color[i] = COLOR_CODE;
      this._color[j] = COLOR_CODE;
    }
  
    Animate.prototype.length = function() {
      return this._array.length;
    }
  
  /**
   * @tutorial https://humanwhocodes.com/blog/2009/05/26/computer-science-in-javascript-bubble-sort/
   * @summary
   * Bubble sort is usually the first sorting algorithm taught because it is one of the least efficient and  easiest to  understand. 
   * Bubble sort compare items, two at a time, and make sure that they are in the correct order before moving on to other items. 
   * At the end of each pass, a value “bubbles” into the correct position, ultimately leaving only the other items to sort. 
   * Bubble sort Compare the first item to the second item.
    If the first item should be after the second item, swap them.
    Compare the second item to the third item.
    If the second item should be after the third item, swap them.
    Continue until the end of the data set is reached. This process repeared until the array is sorted
   * @param {*} arraySort 
   */
    const bubblesort = (arraySort) => {
      
      let n = arraySort.length();
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arraySort.lessThan(j + 1, j)) {
            arraySort.swap(j, j + 1);
          }
        }
      }
    }
  
    /**
     * @tutorial https://humanwhocodes.com/blog/2009/09/08/computer-science-in-javascript-selection-sort/
     * @summary
     * The selection sort algorithm, also with O(n2) complexity. Instead of comparing each array item to its neighbor, 
     * the goal is to locate the smallest remaining value and drop it into the correct place in the array.
    
     * Let the first item be smallest value.
     * Compare this item to the second item.
    If the second item is smaller than the first, set the second item as the new minimum.
    Continue until the end of the data set is reached.
    If the minimum value is not the item you started with, swap them.
    This process is repeated by moving to the second item, then the third, etc. until the entire array has been sorted. 
     * @param {*} arraySort 
     */
    const selectionsort = (arraySort) => {
      let n = arraySort.length();
      for (let i = 0; i < n - 1; i++) {
        let min_j = i;
        for (let j = i; j < n; j++) {
          if (arraySort.lessThan(j, min_j)) min_j = j;
        }
        arraySort.swap(i, min_j);
      }
    }
  
    /**
     * @description Insertion sort is a method of sorting an array by dividing the array into a 'sorted' portion and 'unsorted' portion. 
     * Then we compare the unsorted item to see if it is larger than the previous element, if not we insert the new item. 
     * Basically looking from left to right and sorting as we go.
     * @param {} arrayToSort 
     */
    const insertionsort = (arraySort) => {
      let n = arraySort.length();
      for (let i = 1; i < n; i++) {
        for (let j = i; j > 0 && arraySort.lessThan(j, j - 1); j--) {
          arraySort.swap(j, j - 1);
        }
      }
    }
    
    /**
     * @tutorial https://www.growingwiththeweb.com/2016/10/odd-even-sort.html
     * @summary
     * Like bubble sort, odd-even sort works by iterating through the list, comparing adjacent elements and swapping them if they’re in the wrong order. 
     * The unique characteristic of odd-even sort, and also how it got its name, is how the sort’s iterations alternate between sorting odd/even and even/odd indexed pairs.
     * Much like bubble sort, odd-even sort has very little relevance in the real world and is mainly used to teach algorithms.
     * @param {*} arraySort 
     */
  
    const odd_even_sort = (arraySort) => {
      let n = arraySort.length();
      let sorted = false;
      while (!sorted) {
        sorted = true;
        for (let p = 0; p <= 1; p++) {
          for (let i = p; i + 1 < n; i += 2) {
            if (arraySort.lessThan(i + 1, i)) {
              arraySort.swap(i + 1, i);
              sorted = false;
            }
          }
        }
      }
    }
  
    /**
     * @tutorial https://rosettacode.org/wiki/Sorting_algorithms/Cocktail_sort
     * @summary Cocktail sort is basically a new bubble sort
     * @param {} arraySort 
     */
    const cocktail_sort = (arraySort) => {
      let n = arraySort.length();
      let left = 0;
      let right = n - 1;
      while (left < right) {
        let new_right = right - 1;
        for (let i = left; i + 1 <= right; i++) {
          if (arraySort.lessThan(i + 1, i)) {
            arraySort.swap(i + 1, i);
            new_right = i;
          }
        }
        right = new_right;
        let new_left = left + 1;
        for (let i = right; i - 1 >= left; i--)  {
          if (arraySort.lessThan(i, i - 1)) {
            arraySort.swap(i, i - 1);
            new_left = i;
          }
        }
        left = new_left;
      }
    }
  
  
    function choose_pivot(arraySort, pivot_type, left, right) {
      if (typeof(left) === 'undefined') left = 0;
      if (typeof(right) === 'undefined') right = arraySort.length() - 1;
      let pivot = null;
      if (pivot_type === 'random') {
        pivot = randint(left, right);
      } else if (pivot_type === 'first') {
        pivot = left;
      } else if (pivot_type === 'last') {
        pivot = right;
      } else if (pivot_type === 'middle') {
        pivot = Math.round((left + right) / 2);
      } else if (pivot_type === 'median3') {
        if (left + 1 === right) {
          pivot = left;
        } else {
          let middle = Math.round((left + right) / 2);
          let leftmiddle = arraySort.lessThan(left, middle);
          let middleright = arraySort.lessThan(middle, right);
          if (leftmiddle === middleright) {
            pivot = middle;
          } else if (leftmiddle && !middleright) {
            pivot = arraySort.lessThan(left, right) ? right : left;
          } else if (!leftmiddle && middleright) {
            pivot = arraySort.lessThan(left, right) ? left : right;
          }
        }
      } else {
        throw 'Invalid pivot_type ' + pivot_type;
      }
      return pivot;
    }
  
  
    function partition(arraySort, pivot_type, left, right) {
      let pivot = choose_pivot(arraySort, pivot_type, left, right);
      arraySort.swap(pivot, right);
  
      // Partition the array 
      pivot = left;
      for (let i = left; i < right; i++) {
        if (arraySort.lessThan(i, right)) {
          if (i != pivot) {
            arraySort.swap(i, pivot);
          }
          pivot += 1
        }
      }
      arraySort.swap(right, pivot);
  
      return pivot;
    }
  
    /**
     * @tutorial https://medium.com/@Charles_Stover/implementing-quicksort-in-javascript-8044a8e2bf39
     * Quicksort works by picking an element from the array and denoting it as the “pivot.” 
     * All other elements in the array are split into two categories — 
     * they are either less than or greater than this pivot element.
     * Each of the two resulting arrays (array of values less-than-the-pivot and array of values greater-than-the-pivot) is then put through that very same algorithm.
     * A pivot is chosen and all other values are separated into two arrays of less-than and greater-than values.
     * Eventually, a sub-array will contain a single value or no value at all, as there will be no more values with which to compare it. 
     * The rest of the values were all denoted to be “pivots” at some previous point and did not trickle down to this lowest sub-array. At that point, the values will be sorted, as all values have now been declared as less than or greater than all other values in the array.

     * @param {*} arraySort 
     * @param {*} pivot_type 
     * @param {*} left 
     * @param {*} right 
     */
    function quicksort(arraySort, pivot_type, left, right) {
      let n = arraySort.length();
      if (typeof(left) === 'undefined') left = 0;
      if (typeof(right) === 'undefined') right = n - 1;
  
      if (left >= right) return;
  
      let pivot = partition(arraySort, pivot_type, left, right);
      quicksort(arraySort, pivot_type, left, pivot - 1);
      quicksort(arraySort, pivot_type, pivot + 1, right);
    }
  
  
    function check_permutation(permutation) {
      //  see if an array is a valid permutation.
      let n = permutation.length;
      let used = {};
      for (let i = 0; i < n; i++) {
        if (used[permutation[i]]) return false;
        used[permutation[i]] = true;
      }
      for (let i = 0; i < n; i++) if (!used[i]) return false;
      return true;
    }
  
  /** 
       *  @description Convert a permutation to a sequence of transpositions.
       *  
       *  We represent a general permutation as a list of length N
       *  where each element is an integer from 0 to N - 1, with the
       *  interpretation that the element at index i will move to index
       *  permutation[i].
       *
       *  In general any permutation can be written as a product of
       *  transpositions; we represent the transpostions as an array t of
       *  length-2 arrays, with the interpretation that we first swap
       *  t[0][0] with t[0][1], then swap t[1][0] with t[1][1], etc.
       *
       *  @param {*} permutation
       *  @return transpositions: a list of transpositions.
       */
    function permutation_to_swaps(permutation) {
      
      if (!check_permutation(permutation)) {
        console.log(permutation);
        throw "Invalid permutationutation";
      }
      let n = permutation.length;
      let used = [];
      for (let i = 0; i < n; i++) used.push(false);
      let transpositions = [];
  
      for (let i = 0; i < n; i++) {
        if (used[i]) continue;
        let cur = i;
        if (permutation[i] == i) used[i] = true;
        while (!used[permutation[cur]]) {
          transpositions.push([cur, permutation[cur]]);
          used[cur] = true;
          cur = permutation[cur];
        }
      }
  
      return transpositions;
    }
  
    /**
     * @tutorial https://medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060
     * @summary Merge sort is one of the most popular sorting algorithm. It works by diving can conquering to sort a list
     * of elements. Meaning, it will divide the bigger problem into smaller problems and then solve each of the small problems in order to solve the bigger problem that we started out with.
     * In this function, we divide original array to two equal size. Call Left and Right
     * @param {*} arraySort 
     * @param {*} left 
     * @param {*} right 
     */

    const mergesort = (arraySort, left, right) => {
      if (typeof(left) === 'undefined') left = 0;
      if (typeof(right) === 'undefined') right = arraySort.length() - 1;
  
      if (left >= right) return;
      
      let mid = Math.floor((left + right) / 2);
  
      if (right - left > 1) {
        mergesort(arraySort, left, mid);
        mergesort(arraySort, mid + 1, right);
      }
  
      let next_left = left;
      let next_right = mid + 1;
      let permutation = [];
      for (let i = left; i <= right; i++) {
        let choice = null;
        if (next_left <= mid && next_right <= right) {
          if (arraySort.lessThan(next_left, next_right)) {
            choice = 'L';
          } else {
            choice = 'R';
          }
        } else if (next_left > mid) {
          choice = 'R';
        } else if (next_right > right) {
          choice = 'L';
        }
        if (choice === 'L') {
          permutation.push(next_left - left);
          next_left++;
        } else if (choice === 'R') {
          permutation.push(next_right - left);
          next_right++;
        } else {
          throw 'Should not get here'
        }
      }
  
      let swaps = permutation_to_swaps(permutation);
      for (let i = 0; i < swaps.length; i++) {
        arraySort.swap(swaps[i][0] + left, swaps[i][1] + left);
      }
    }
  
    function heapsort(arraySort, left, right) {
      if (typeof(left) === 'undefined') left = 0;
      if (typeof(right) === 'undefined') right = arraySort.length() - 1;
      let n = right - left + 1;
  
      function sift_down(start, end) {
        let root = start;
        while (true) {
          let left_child = 2 * (root - left) + 1 + left;
          let right_child = 2 * (root - left) + 2 + left;
          if (left_child > end) break;
  
          let swap = root;
          if (arraySort.lessThan(swap, left_child)) {
            swap = left_child;
          }
          if (right_child <= end && arraySort.lessThan(swap, right_child)) {
            swap = right_child;
          }
          if (swap === root) {
            return;
          }
          arraySort.swap(root, swap);
          root = swap;
        }
      }
  
      //  build a heap
      let start = Math.floor(n / 2) - 1 + left;
      while (start >= left) {
        sift_down(start, right);
        start--;
      }
  
      // pop elements one by one, rebuilding the heap after each
      let end = right;
      while (end > left) {
        arraySort.swap(end, left);
        end--;
        sift_down(left, end);
      }
    } 
  
    function introsort(arraySort, pivot_type, left, right, maxdepth) {
      if (typeof(left) === 'undefined') left = 0;
      if (typeof(right) === 'undefined') right = arraySort.length() - 1;
  
      let n = right - left + 1;
      if (typeof(maxdepth) === 'undefined') {
        maxdepth = 2 * Math.floor(Math.log(n) / Math.log(2));
      }
  
      if (n <= 1) return;
      if (maxdepth === 0) {
        heapsort(arraySort, left, right);
      } else {
        let pivot = partition(arraySort, pivot_type, left, right);
        introsort(arraySort, pivot_type, left, pivot, maxdepth - 1);
        introsort(arraySort, pivot_type, pivot + 1, right, maxdepth - 1);
      }
    }
  
  
    function bitonic(arraySort, up, left, right) {
      let n = right - left + 1;
      let step = Math.floor(n / 2);
      while (step > 0) {
        for (let i = 0; i < n; i += step * 2) {
          let k = 0;
          for (let j = i; k < step; j++) {
            let cmp = arraySort.compare(left + j, left + j + step);
            if ((up && cmp > 0) || (!up && cmp < 0)) {
              arraySort.swap(left + j, left + j + step);
            }
            k++;
          }
        }
        step = Math.floor(step / 2);
      }
    }
  
  
    function bitonicsort(arraySort) {
      let n = arraySort.length();
      let n2 = 1;
      while (n2 < n) n2 *= 2;
      if (n !== n2) throw "Bitonic sort must use a power of 2";
      for (let s = 2; s <= n2; s *= 2) {
        for (let i = 0; i < n;) {
          bitonic(arraySort, true, i, i + s - 1);
          bitonic(arraySort, false, i + s, i + 2 * s - 1);
          i += s * 2;
        }
      }
    }
  
  
    let algorithms = {
      'bubblesort': bubblesort,
      'selectionsort': selectionsort,
      'odd_even_sort': odd_even_sort,
      'cocktail_sort': cocktail_sort,
      'insertionsort': insertionsort,
      'heapsort': heapsort,
      'quicksort': quicksort,
      'mergesort': mergesort,
      'introsort': introsort,
      'bitonicsort': bitonicsort,
    }
  
    function is_pivot_algo(algo) {
      let pivot_algos = {
        'quicksort': true,
        'introsort': true,
      };
      return pivot_algos.hasOwnProperty(algo);
    }
  
    function get_sort_fn(algo, pivot_type) {
      if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
      }
      let sort_fn = algorithms[algo];
      if (is_pivot_algo(algo)) {
        return function(arraySort) { sort_fn(arraySort, pivot_type); };
      } else {
        return sort_fn;
      }
    }
    
    return {
      'Animate': Animate,
      'get_sort_fn': get_sort_fn,
      'is_pivot_algo': is_pivot_algo,
      'algorithms': algorithms,
    }
  
    
  
  })();