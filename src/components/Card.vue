<template lang="html">

          <article class="card" 
            :class="[{'selected': card.selected}, mode]">
              <img :src="card.imgUrl" />
              <h4 class="card-name">{{ card.name }}</h4>

              <p class="card-cost">
                <span>{{ (mode === 'preview' && card.selected)? '&#10004;': card.elixirCost }}</span>
              </p>

         </article>

</template>

<script lang="js">
  export default  {
    name: 'card',
    props: ['card', 'mode']
}
</script>

<style scoped lang="scss">
  @import '../css/layout';

  .card {
    position:relative;
    margin: 8px 3px;
    background-color:  rgba(10, 93, 106, 0.5);
    color: white; 
    
    &.preview {
        font-size: 2em;
        @include for-mobile-only {
          font-size: 0.1em;
          img {
              max-height:60px;
          }
          .card-name {
            font-family: Arial, Helvetica, sans-serif
          }
        
        }
    }
    &.deck-preview {
      display: inline-block;
      margin:10px 0 0 5px;
      flex-grow: 1;
      // height:100px;
      width: calc(100% * (1/4) - 10px - 1px);
      /*font-size: 0.1em;*/
      img {
        max-height:200px;
        @include for-mobile-only {
          max-height:90px;
        }
      }
      
    }    

    &.preview.selected {
      color: green
        /*.card-cost {
          color: --var(main-color)
        }    */
    }
    .card-name {
      position:absolute;
      bottom: -15px;
      // letter-spacing: -1px;  
      background: rgba(0, 0, 0, 0.7);
      padding: 0.5em; 

    }
    .card-cost {
      display:block;
      padding: 4px 8px;
      border-radius: 50%;
      font-size: 1.2em;
      position:absolute;
      top: -15px;
      right:1px;
      background: rgba(0, 0, 0, 0.7);
      
    }

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>
