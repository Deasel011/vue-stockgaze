<template>
  <div class="mse" v-if="msesqrd!=null">
    <div  v-for="g in msesqrd" :key="g.symbol">
      <p>{{g.exchange+ ':' + g.symbol + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mse squared value:'+g.jsonIndicators.highest_mse_sqrd.value.toFixed(4)}}</p>
      <p>Last update: {{g.json1year.slice(-1)[0].m_start.substr(0,10)}}</p>
    <graph-line
                :width="600"
                :height="400"
                :shape="'normal'"
                :axis-min="g_min(g.json1year)"
                :axis-max="g_max(g.json1year)"
                :axis-full-mode="true"
                :labels="g.json1year.map(x=>'')"
                :names="[ g.symbol]"
                :values="[
            g.json1year.map(x=>x.m_close)
        ]">
      <!--<note :text="g.exchange+ ':' + g.symbol + '  Mse squared value:'+g.jsonIndicators.highest_mse_sqrd.value.toFixed(4)"></note>-->
      <guideline :tooltip-y="true"></guideline>
    </graph-line>
      <hr/>
    </div>
  </div>
</template>

<script>
  import ApiHelper from '../utils/ApiHelper'
  import GraphLine from 'vue-graph/src/components/line'
  import NoteWidget from 'vue-graph/src/widgets/note'
  import LegendsWidget from 'vue-graph/src/widgets/legends'
  import TooltipWidget from 'vue-graph/src/widgets/tooltip'
  import GuidelineWidget from 'vue-graph/src/widgets/guideline'

  export default {
    name: 'MseSqrdStock',
    data: function () {
      return {msesqrd: null}
    },
    mounted() {
      ApiHelper.GetHighestMseSqrd().then(res => {
        (this.msesqrd = res.data);
      })
    },
    components: {
      'graph-line': GraphLine,
      'note': NoteWidget,
      'legends': LegendsWidget,
      'tooltip': TooltipWidget,
      'guideline': GuidelineWidget
    },
    methods: {
      g_min: function (array) {
        array = array.map(x=>x.m_close);
        return Math.min(...array);
      },
      g_max: function (array) {
        array = array.map(x=>x.m_close);
        return Math.max(...array);
      }
    }
  }
</script>

<style scoped>
  p{
    margin-bottom: 0;
  }
</style>
