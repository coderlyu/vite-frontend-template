<template>
  <ul :class="isMobile ? '' : 'au-pd-16'">
    <li
      class="au-flex au-flex-column-center"
      :class="isMobile ? '' : 'au-pd-8'"
      v-for="(item, index) in list"
      :key="index"
      @click="toDetail(item)"
    >
      <span class="au-text-center rank">{{ index + 1 }}</span>
      <p class="au-text-line-one">{{ item.title }}</p>
      <span class="au-text-center num">{{ item.num }}</span>
      <small class="au-text-center">解读</small>
    </li>
  </ul>
</template>
<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'AuRank',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, ctx) {
    const toDetail = (item) => {
      ElMessage('敬请期待' + item.id)
    }
    return {
      toDetail
    }
  },
})
</script>
<style lang="scss" scoped>
li {
  height: 60px;
  cursor: pointer;
  transition: all 0.5s;
  border-bottom: 1px dashed #efefef;
  .rank {
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #ff7676;
    background: #e6e6e6;
    border: 2px solid #fff;
    box-shadow: 0 0 6px 0 #ee706d;
    border-radius: 50%;
    margin-right: 16px;
  }
  p {
    font-family: fangsong;
    color: #000;
    font-size: 16px;
    flex: 1;
  }
  .num {
    font-size: 14px;
    color: #9e9e9e;
    width: 80px;
  }
  small {
    display: block;
    color: #9e9e9e;
    width: 80px;
  }
  &:nth-of-type(1) {
    .rank {
      background: #ff7676;
      color: #fff;
    }
  }
  &:nth-of-type(2) {
    .rank {
      background: #ff9595;
      color: #fff;
    }
  }
  &:nth-of-type(3) {
    .rank {
      background: #ffb9b9;
      color: #fff;
    }
  }
  &:nth-last-of-type(1) {
    border-bottom: 1px dashed transparent;
  }
  &:hover {
    background: #fff9f9;
    small {
      color: #ff7676;
    }
  }
}
@media screen and (max-width: 789px) {
  ul {
    li {
      small {
        display: none;
      }
    }
  }
}
</style>
