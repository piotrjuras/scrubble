const sitemap = [
    {
        label: 'scrubble',
        routeName: 'register',
        children: [
            {
                label: 'logowanie',
                routeName: 'login',
                children: [
                    {
                        label: 'dupa',
                        routeName: 'none'
                    }
                ]
            },
            {
                label: 'gra',
                routeName: 'spectator'
            },
            {
                label: 'gra',
                routeName: 'game',
                children: [
                    {
                        label: 'ustawienia',
                        routeName: 'game-settings'
                    }
                ]
            },
        ]
    }
]


export const findBreadcrumbs = (breadcrumb, target) => {  
    if(breadcrumb.routeName === target) return [breadcrumb] // if the value is found return it wrap in an array

    for(const child of breadcrumb.children || []) { // iterate the children or an empty array
        const leaf = findBreadcrumbs(child, target) // use findPath on all children
        console.log(leaf, child);
        if(leaf) return [breadcrumb, ...leaf] // if a leaf is found (not null) spread it to the current array, and return it
    }

    return null;
}

export default sitemap;