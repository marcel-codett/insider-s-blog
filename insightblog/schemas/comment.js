export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'post',
      type: 'reference',
      to: { type: 'post' },
    },
  ],
}
