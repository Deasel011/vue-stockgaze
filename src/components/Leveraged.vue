<template>
  <div class="lever" v-if="lever!=null">
    <div  v-for="g in lever" :key="g.symbol">
      <p>{{g.exchange+ ':' + g.symbol}}</p>
      <p>Last update: {{g.json1year.slice(-1)[0].m_start.substr(0,10)}}</p>
      <p>Description: {{g.leveragedExtra}}</p>
    <graph-line
                :width="450"
                :height="300"
                :shape="'normal'"
                :axis-min="g_min(g.json1year)"
                :axis-max="g_max(g.json1year)"
                :axis-full-mode="true"
                :labels="g.json1year.map(x=>'')"
                :names="[ g.symbol]"
                :values="[
            g.json1year.map(x=>x.m_close)
        ]">
      <note :text="'1 year - daily tick on close'"></note>
      <guideline :tooltip-y="true"></guideline>
    </graph-line>
      <graph-line
        :width="450"
        :height="300"
        :shape="'normal'"
        :axis-min="g_min(g.json1year)"
        :axis-max="g_max(g.json1year)"
        :axis-full-mode="true"
        :labels="g.json1year.map(x=>'')"
        :names="[ g.symbol]"
        :values="[
            g.json6months.map(x=>x.m_close)
        ]">
        <note :text="'6 months - 4 hours tick'"></note>
        <guideline :tooltip-y="true"></guideline>
      </graph-line>
        <graph-line
          :width="450"
          :height="300"
          :shape="'normal'"
          :axis-min="g_min(g.json1year)"
          :axis-max="g_max(g.json1year)"
          :axis-full-mode="true"
          :labels="g.json1year.map(x=>'')"
          :names="[ g.symbol]"
          :values="[
            g.json3weeks.map(x=>x.m_close)
        ]">
          <note :text="'3 weeks - 15 minutes tick'"></note>
          <guideline :tooltip-y="true"></guideline>
        </graph-line>
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
    name: 'Leveraged',
    data: function () {
      return {lever: null}
    },
    mounted() {
      ApiHelper.GetLeveraged().then(res => {
        (this.lever = res.data);
        console.log(JSON.parse(this.lever[1].leveragedExtra));
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
      },
      test: function(){
        return "bob"
      }
    }
  }
</script>


<style scoped>
</style>
