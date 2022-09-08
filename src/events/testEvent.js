const handler = async (payload) => {
  // Event handler code for aha
  console.log("hello!");
  console.log(payload);
  const { record } = payload;

  const { Comment, Epic, Feature, Task } = aha.models;
  await record.reload({
    query: Comment.select("id", "body").merge({
      commentable: Feature.select("id", "name")
        .union(Epic.select("id", "name"))
        .union(Task.select("id", "name", "body")),
    }),
  });
  console.log(record);
};

aha.on({ event: "aha.create.Comment" }, handler);
aha.on({ event: "aha.update.Comment" }, handler);
