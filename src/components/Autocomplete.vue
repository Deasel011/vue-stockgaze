<template>
  <div class="autocomplete">
    <input type="text"
           v-model="search"
           @input="onChange"
            placeholder="Search..."/>
    <ul v-show="isOpen" class="autocomplete-results">
      <li v-for="(result, i) in results"
          :key="i"
          @click="setResult(result)"
          class="autocomplete-result">
        {{ result.name+" - "+result.symbol }}
      </li>
    </ul>
  </div>
</template>

<script>
  import ApiHelper from '../utils/ApiHelper'
    export default {
        name: "Autocomplete",
      data() {
        return {
          search: '',
          results: [],
          isOpen: false,
          arrowCounter: -1,
        };
      },
      methods: {
        onArrowDown() {
          if (this.arrowCounter < this.results.length) {
            this.arrowCounter = this.arrowCounter + 1;
          }
        },
        onArrowUp() {
          if (this.arrowCounter > 0) {
            this.arrowCounter = this.arrowCounter - 1;
          }
        },
        onEnter() {
          this.search = this.results[this.arrowCounter];
          this.isOpen = false;
          this.arrowCounter = -1;
        },
        onChange() {
          // Let's warn the parent that a change was made
          this.$emit('input', this.search);

          // Is the data given by an outside ajax request?
          if (this.isAsync) {
            this.isLoading = true;
            this.getResults();
          } else {
            // Data is sync, we can search our flat array
            this.getResults();
            this.isOpen = this.search.length > 0;
          }
        },
        filterResults() {
          this.results = this.items;
        },
        getResults(){
          ApiHelper.GetSymbolSearchResult(this.search).then(res => {
            this.items = res.data.value;
            this.isOpen = (this.items.length > 0);
            this.filterResults();
          }).catch(err=>{
            this.isOpen = false;
          })

        },
        setResult(result) {
          this.search = result.symbol;
          this.isOpen = false;
        },
        handleClickOutside(evt) {
          if (!this.$el.contains(evt.target)) {
            this.isOpen = false;
          }
        },
        mounted() {
          document.addEventListener('click', this.handleClickOutside);
        },
        destroyed() {
          document.removeEventListener('click', this.handleClickOutside);
        }
      },
      props: {
        items: {
          type: Array,
          required: false,
          default: () => [],
          isAsync: {
            type: Boolean,
            required: false,
            default: false,
          },
        },
      },
      watch: {
        // Once the items content changes, it means the parent component
        // provided the needed data
        items: function (value, oldValue) {
          // we want to make sure we only do this when it's an async request
          if (this.isAsync) {
            this.results = value;
            this.isOpen = true;
            this.isLoading = false;
          }
        }
      },
    }
</script>

<style scoped>
  autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    background:white;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #3f007f;
    color: white;
  }
</style>
