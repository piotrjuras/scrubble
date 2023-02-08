const sitemap = [
    {
        label: 'gra',
        routeName: 'game',
        children: [
            {
                label: 'ustawienia',
                routeName: 'game-settings',
                children: [
                    {
                        label: 'test',
                        routeName: 'game-settings-test'
                    }
                ]
            },
            {
                label: 'dwa',
                routeName: 'game-second',
                children: [
                    {
                        label: 'test',
                        routeName: 'game-second-test' 
                    }
                ]
            }
        ]
    }
]

export default sitemap;