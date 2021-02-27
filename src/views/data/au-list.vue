<template>
  <div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-for="item in list" :key="item.id" class="au-mt-16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ item.name }}</span>
            </div>
          </template>
          <section class="au-flex list-item">
            <img :src="item.imgUrl" alt="活动图片">
            <div class="au-ml-16 item-right">
              <span class="au-block au-text-line-one">{{ item.title }}</span>
              <span class="au-block au-mt-32">文章描述：</span>
              <p class="au-text-line-two au-mt-32">{{ item.content }}</p>
              <p class="au-mt-32">
                创作指导： 
                <a href="javascript: void(0);">{{ item.link }}</a>
              </p>
            </div>
          </section>
          <div class="bottom-btns">
            <span class="au-in-block au-text-center" style="vertical-align: middle;">查看详情</span>
            <span class="au-in-block au-text-center" style="vertical-align: middle;">立即创作</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <section class="au-text-end au-mt-16">
      <el-pagination
        :page-size="limit"
        :current-page="page"
        :pager-count="5"
        layout="prev, pager, jumper, next"
        :total="total"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
      />
    </section>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
  },
  setup(prop, ctx) {
    return {
      ...prop.pagination
    }
  }
})
</script>
<style lang="scss" scoped>
.box-card {
  position: relative;
  overflow: hidden;
  .bottom-btns {
    position: absolute;
    height: 60px;
    bottom: -60px;
    left: 0;
    right: 0;
    z-index: 1;
    background: #fff;
    transition: all .5s ease-in-out;
    span {
      width: 50%;
      height: 100%;
      line-height: 60px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      transition: all .5s;
      &:nth-of-type(1) {
        background: #ffafaf;
        &:hover {
          background: #fff;
          color: #ff9a9a;
        }
      }
      &:nth-of-type(2) {
        background: #89c3d4;
        &:hover {
          background: #fff;
          color: #89a3b4;
        }
      }
    }
  }
  &:hover {
    .bottom-btns {
      bottom: 0px;
    }
  }
}
.list-item {
  img {
    width: 160px;
  }
  .item-right {
    flex: 1;
    overflow: hidden;
    & > span:nth-of-type(1) {
      font-size: 16px;
      font-weight: 600;
    }
    & > span:nth-last-of-type(1) {
      color: #666;
      font-size: 16px;
      font-family: cursive;
      font-weight: 600;
    }
    & > p:nth-of-type(1) {
      color: #969696;
      font-size: 14px;
    }
    & > p:nth-last-of-type(1) {
      a {
        color: #409EFF;
        text-decoration: none;
        &:hover {
          color: rgba(64, 158, 255, .8);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>