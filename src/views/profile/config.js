export default function ({ }) {
  return {
    columns: [
      {
        label: '性别',
        props: 'sex'
      },
      {
        label: '一句话介绍',
        props: 'intro'
      },
      {
        label: '所在行业',
        props: 'work'
      },
      {
        label: '个人简介',
        props: 'mark'
      }
    ],
    config: {
      nick: { props: 'nick', type: 'input', placeholder: '请输入昵称' },
      sex: {
        props: 'sex',
        type: 'radio',
        options: [
          {
            label: '男',
            value: '男'
          },
          {
            label: '女',
            value: '女'
          }
        ]
      },
      intro: {
        props: 'intro',
        type: 'input',
        placeholder: '请输入一句话介绍'
      },
      work: {
        props: 'work',
        type: 'input',
        placeholder: '请输入所在行业'
      },
      mark: {
        props: 'mark',
        type: 'input',
        placeholder: '请输入个人简介'
      }
    }
  }
}