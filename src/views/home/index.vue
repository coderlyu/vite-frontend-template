<template>
  <div class="home">
    <el-row :gutter="16" class="au-card au-box-shadow au-mt-16 au-pd-16" style="margin-left: -5px;margin-right: -5px;">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-row :gutter="16" class="au-flex au-flex-column-center au-pd-16 au-mt-32 home-profile">
           <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
            <section class="au-flex au-flex-column-center profile-avatar">
              <img src="../../assets/images/profile.jpg" alt="头像">
              <section class="au-ml-16">
                <p class="title">
                  <span>CODERLY</span>
                  <small>官方认证</small>
                </p>
                <p class="au-mt-16 content">
                  <span class="au-block">认证机构：随意点大学</span>
                  <span class="au-block">认证信息：点到为止</span>
                </p>
              </section>
            </section>
           </el-col>
           <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="au-mt-8">
            <section class="au-flex au-flex-column-center profile-grade">
              <V1 class="au-icon self-icon" :class="{ 'active' : levelActive === 1 }" />
              <V2 class="au-icon self-icon" :class="{ 'active' : levelActive === 2 }" />
              <V3 class="au-icon self-icon" :class="{ 'active' : levelActive === 3 }" />
              <V4 class="au-icon self-icon" :class="{ 'active' : levelActive === 4 }" />
              <V5 class="au-icon self-icon" :class="{ 'active' : levelActive === 5 }" />
              <span :style="levelNameActive">当前等级</span>
            </section>
           </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="au-flex au-flex-row-center au-card au-pd-16 au-mt-32 self-todo">
          <span>代办事项(2)</span>
          <p>
            <span class="au-block au-text-line-one au-mt-8">新的一年好好干，今年争取再给你盖栋大楼</span>
            <span class="au-block au-text-line-one">你还差1个小时就超过前一位同事的工时了，是否前去处理</span>
          </p>
          <el-button type="primary" style="margin-top: 16px;">查看详情</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="au-card au-box-shadow au-mt-16 au-pd-16">
      <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in counts" :key="item.id" class="au-mt-16">
        <section class="home-count">
          <i class="iconfont self-icon" :class="item.icon"></i>
          <section class="au-overflow-hidden" style="flex: 1;">
            <p class="au-text-line-one title">{{ item.title }}</p>
            <small class="au-in-block count">{{ item.num }}</small>
          </section>
        </section>
      </el-col>
    </el-row>
    <section class="au-card au-box-shadow au-mt-16 au-pd-16 notice">
        <p class="notice-title">平台公告</p>
        <notice-list :isMobile="isMobile" />
    </section>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import NoticeList from './notice.vue'
// svg
import V1 from '../../icons/svg/v1.svg'
import V2 from '../../icons/svg/v2.svg'
import V3 from '../../icons/svg/v3.svg'
import V4 from '../../icons/svg/v4.svg'
import V5 from '../../icons/svg/v5.svg'
import Screen from '../../components/au-screen'
import { getCountlist, getCurrentLevel } from '../../api/home'
export default defineComponent({
  components: {
    V1,
    V2,
    V3,
    V4,
    V5,
    NoticeList
  },
  name: 'Home',
  setup(prop, ctx) {
    const { isMobile } = Screen()
    const counts = ref([])
    const levelActive = ref(3)
    onMounted(() => {
      getCountlist().then(({ error_code, message, data }) => {
        if (error_code === 200) {
          counts.value = data
        }
      })
      getCurrentLevel().then(({ error_code, message, data }) => {
        if (error_code === 200) {
          levelActive.value = data
        }
      })
    })
    const levelNameActive = computed(() => {
      let styles = {}
      let left = `calc(25% * ${levelActive.value - 1})`
      if (levelActive.value === 5) styles.right = '-4px'
      else if (levelActive.value === 1) styles.left = '-4px'
      else {
        styles.left = left
        if (levelActive.value === 2) styles.transform = `translateX(-30%)`
        else if (levelActive.value === 3) styles.transform = `translateX(-50%)`
        else styles.transform = `translateX(-75%)`
      }
      return styles
    })
    return {
      isMobile,
      counts,
      levelNameActive,
      levelActive
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  margin-right: 16px;
  .home-profile {
    .profile-avatar {
      img {
        width: 90px;
        height: 90px;
      }
      .title {
        span {
          font-family: fantasy;
          color: #555;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: .05em;
        }
        small {
          margin-left: 4px;
          color: #f1a00f;
          background: #ffefd1;
          border-radius: 5px;
          font-weight: 600;
          padding: 2px 4px;
          font-size: 12px;
          box-shadow: 0 0 7px 0 #ffe8be;
        }
      }
      .content {
        font-size: 14px;
        color: #999;
        line-height: 20px;
      }
    }
    .profile-grade {
      justify-content: space-between;
      position: relative;
      span {
        position: absolute;
        bottom: -25px;
        font-size: 12px;
        color: #f1a00f;
      }
      &::before {
        content: "";
        position: absolute;
        height: 2px;
        left: 0;
        right: 0;
        background: #f1a00f;
      }
      .self-icon {
        position: relative;
        width: 40px;
        height: 30px;
        border: 1px solid #f1a00f;
        padding: 3px 0px;
        border-radius: 13px;
        background: #fff;
      }
      .active {
        box-shadow: 0 0 12px 0 #f1a00f;
        transform: scale(1.1);
      }
    }
  }
  .self-todo {
    flex-direction: column;
    & > span:nth-of-type(1) {
      color: #444;
      font-weight: 600;
      line-height: 32px;
    }
    p {
      span {
        font-size: 12px;
        color: #999;
      }
      & > span:nth-of-type(1) {
        font-size: 14px;
        color: #666;
      }
    }
  }
  .home-count {
    padding: 32px 16px;
    display: flex;
    border: 2px dashed #fafafa;
    border-radius: 3px;
    transition: all .35s;
    .self-icon {
      font-size: 50px;
      margin-right: 16px;
      color: #5ac6f9;
    }
    .title {
      font-size: 14px;
      color: #999;
    }
    .count {
      font-size: 16px;
      margin-top: 8px;
      color: #5ac6f9;
      font-weight: 600;
      letter-spacing: .1em;
    }
    &:hover {
      border: 2px dashed #eee;
      box-shadow: 0px 0px 12px 0px #eee inset;
      border-radius: 3px;
    }
  }
  .notice {
    margin-left: -5px;
    margin-right: -5px;
    &-title {
      font-family: cursive;
      line-height: 40px;
      font-size: 20px;
      color: #000;
      font-weight: 600;
    }
  }
}
@media screen and (max-width: 769px) {
  .home {
    margin-right: 0px;
    padding: 16px 0px;
    .home-count {
      padding: 32px 0px;
    }
  }
}
</style>
