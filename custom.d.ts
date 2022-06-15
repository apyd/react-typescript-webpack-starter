declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}