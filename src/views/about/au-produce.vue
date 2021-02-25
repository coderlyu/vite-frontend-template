<template>
  <div class="au-card au-pd-16 au-bg-grey au-flex self-grade">
    <section class="au-flex au-flex-column-center grade-title">
      <h4 class="au-text-line-one">
        创作等级
        <small class="au-ml-8">最新一次更新2021/10/09</small>
      </h4>
      <a href="javascript:void(0)" class="au-link-text au-text-link au-text-center" @click="readStatements">
        查看等级说明
        <i class="el-icon-arrow-right"></i>
      </a>
    </section>
    <section class="au-flex au-flex-column-center au-mt-32 grade-statement">
      <span class="au-flex-rc-center au-pd-16 self-icon-wrapper">
        <V4 class="au-icon self-icon"/>
      </span>
      <section class="au-flex au-pd-8 au-overflow-hidden grade-statement-body">
        <p class="au-text-line-one tips-text">你当前等级为 Lv 4，还差 200 分即可升级为 Lv 5</p>
        <el-progress :percentage="35" color="#409EFF">
          <small class="au-block au-text-end grade-statement-tips">
            124 / 500
            <el-popover
              placement="top-start"
              title="经验说明"
              :width="200"
              trigger="hover"
              content="贡献越多，得到得经验越多，快快做任务吧"
            >
              <template #reference>
                <i class="el-icon-warning"></i>
              </template>
            </el-popover>
          </small>
        </el-progress>
      </section>
    </section>
  </div>
  <div class="au-card au-flex au-flex-row-center au-mt-32 au-pd-16 au-bg-grey self-medal">
    <h4 class="au-text-line-one title">账号勋章</h4>
    <section class="au-flex au-flex-column-center">
      <span class="au-flex-rc-center au-mt-32 au-mr-32 self-icon-wrapper">
        <G1 class="self-icon"/>
      </span>
      <div class="au-overflow-hidden medal-body">
        <p class="au-text-line-one">账号信用</p>
        <p class="au-text-line-one au-mt-32">出现违规行为将会扣除信用分，信用分降低到一定分数会触发账号处罚，并降低微淘号达人指数</p>
      </div>
      <small class="medal-number">95分</small>
    </section>
  </div>
  <div class="au-card au-mt-32 au-pd-16 au-bg-grey self-active">
    <h4 class="au-text-line-one title">活动中心</h4>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" class="au-mt-32" v-for="item in activeList" :key="item.id">
        <section class="au-bg-white au-overflow-hidden active-item">
          <img :src="item.imgUrl" alt="活动图片" class="item-img">
          <div class="self-mark" @click="toActiveDetail(item)">
            <i class="el-icon-view"></i>
          </div>
          <p class="au-text-line-one date-time">{{ item.time }}</p>
        </section>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import V4 from '../../icons/svg/v4.svg'
import G1 from '../../icons/svg/g1.svg'
export default defineComponent({
  name: 'AuProduce',
  components: {
    V4,
    G1
  },
  setup(props, ctx) {
    const activeList = ref([
      {
        id: 1,
        imgUrl: 'https://pic3.zhimg.com/v2-03371b64a1da395c519938e65965ff61.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 19 日 - 2021 年 03 月 19 日'
      },
      {
        id: 2,
        imgUrl: 'https://pic4.zhimg.com/v2-f93156f6bd568c80d5e2d54833286550.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 08 日 - 2021 年 02 月 26 日'
      },
      {
        id: 3,
        imgUrl: 'https://pic2.zhimg.com/v2-37852e07af93ea1675d8cd50a699f4ff.jpg?source=8c23436a',
        url: '',
        time: '2021 年 01 月 18 日 - 2021 年 03 月 18 日'
      },
      {
        id: 4,
        imgUrl: 'https://pic4.zhimg.com/v2-400ebc21c25b0b7bb0740e6e25a7b1c5.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 05 日 - 2021 年 03 月 05 日'
      },
      {
        id: 5,
        imgUrl: 'https://pic2.zhimg.com/v2-ce896400cea15a93a05bc6b0188b668c.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 03 日 - 2021 年 03 月 03 日'
      },
      {
        id: 6,
        imgUrl: 'https://pic1.zhimg.com/v2-456a0f551ce75a8d5adab52e6413ab1d.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 07 日 - 2021 年 02 月 28 日'
      },
      {
        id: 7,
        imgUrl: 'https://pic4.zhimg.com/v2-a73ecc1ba6adedb07c21b85937560192.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 03 日 - 2021 年 02 月 23 日'
      },
    ])
    const readStatements = () => {
      ElMessage('敬请期待')
    }
    const toActiveDetail = (item) => {
      ElMessage('敬请期待' + item.id)
    }
    return {
      activeList,
      readStatements,
      toActiveDetail
    }
  }
})
</script>
<style lang="scss" scoped>
.self-grade {
  flex-direction: column;
  .grade-title {
    justify-content: space-around;
    h4 {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
      small {
        font-size: 12px;
        color: #a0a0a0;
        font-weight: 400;
      }
    }
    a {
      width: 200px;
      color: #888;
      font-size: 15px;
      i {
        margin-left: 2px;
      }
      &:hover {
        color: #a0a0a0;
        text-decoration: underline #a0a0a0;
      }
    }
  }
  .grade-statement {
    justify-content: space-around;
    .self-icon-wrapper {
      width: 120px;
      .self-icon {
        width: 60px;
        height: 60px;
      }
    }
    &-body {
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      height: 90px;
      .tips-text {
        line-height: 32px;
        font-size: 15px;
        font-weight: 600;
        color: #8a8a8a;
      }
      .grade-statement-tips {
        width: 100px;
        color: #409EFF;
        font-size: 16px;
        i {
          cursor: pointer;
          display: inline-block;
          color: #888;
        }
      }
    }
  }
}
.self-medal {
  flex-direction: column;
  .title {
    line-height: 32px;
    font-size: 16px;
    font-weight: 600;
  }
  .self-icon-wrapper {
    width: 90px;
    height: 90px;
    background: #deefff;
    box-shadow: 0px 0px 12px 0 #b1d7fb inset;
    border-radius: 50%;
    .self-icon {
      width: 60px;
      height: 60px;
    }
  }
  .medal-body {
    flex: 1;
    p:nth-of-type(1) {
      font-size: 16px;
      color: #333;
    }
    p:nth-of-type(2) {
      text-indent: 2em;
      font-size: 12px;
      color: #999;
    }
  }
  .medal-number {
    font-size: 14px;
    font-weight: 600;
    width: 100px;
    letter-spacing: .1em;
    color: #409EFF;
  }
}
.self-active {
  .title {
    line-height: 32px;
    font-size: 16px;
    font-weight: 600;
  }
  .active-item {
    cursor: pointer;
    border-radius: 3px;
    position: relative;
    .item-img {
      width: 100%;
      transition: all .5s;
    }
    .self-mark {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      transition: all .5s;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: transparent;
        animation: eyeBeat 1.5s infinite;
      }
    }
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5%;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      z-index: 2;
    }
    &:hover {
      .self-mark {
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        i {
          font-size: 30px;
          color: #fff;
        }
      }
      .item-img {
        transform: scale(1.2);
      }
    }
  }
}
@keyframes eyeBeat
{
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>