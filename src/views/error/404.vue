<template>
  <div class="au-flex-rc-center au-overflow-hidden error-404">
    <section>
      <h2>404</h2>
      <p class="au-flex">
        <span>NOT FOUND</span>
        <span class="au-mt-16">当前路径不存在或你没有权限访问</span>
        <span class="au-mt-8">如有疑惑请联系系统管理员</span>
        <a href="/" class="au-mt-16 au-text-end">返回主页</a>
      </p>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.error-404 {
  width: 100%;
  height: 100%;
  flex-direction: column;
  h2 {
    color: #409EFF;
    font-size: 100px;
    font-family: fantasy;
    letter-spacing: 0.5em;
    font-weight: 800;
  }
  p {
    flex-direction: column;
    span {
      color: #999;
      font-size: 14px;
      &:nth-of-type(1) {
        font-family: fantasy;
        text-align: end;
      }
    }
    a {
      color: #409EFF;
      transition: all .35s;
      &:hover {
        color: #5ac6f9;
        text-decoration: none;
      }
    }
  }
}
</style>