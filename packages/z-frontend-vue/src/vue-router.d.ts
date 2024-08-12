export declare const RouterView: new () => {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & RouterViewProps;
    $slots: {
        default: (arg: {
            Component: VNode;
            route: RouteLocationNormalizedLoaded;
        }) => VNode[];
    };
};