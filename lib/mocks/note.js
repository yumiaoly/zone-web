var listData = [];
for (var i = 0; i < 20; i++) {
    listData.push({
        title: "俄罗斯文学经典的当代意义",
        icon: "http://micourse.net/Public/img/icons/literature.png",
        score: (Math.random() * 5).toFixed(1),
        comments:43,
        tags: [{
            id: 1,
            name: "3学分"
        }, {
            id: 2,
            name: "通识课"
        }, {
            id: 3,
            name: "文学院"
        }, {
            id: 4,
            name: "文学"
        }, {
            id: 5,
            name: "法律"
        }],
        content: '老师旁征博引，讲课幽默引人入胜，不乏深刻的见地，对俄罗斯文学名著进行当代阐释，揭示其中永恒的美学价值和社会意义，注重文学和当代的联系。不会拘于文学，思想开放。'
    });
}

module.exports = {
    listData: listData
}
