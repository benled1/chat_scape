'use client'
import React from 'react';
import ForceGraph3D, {ForceGraphMethods, NodeObject, LinkObject} from 'react-force-graph-3d';
interface GraphNode extends NodeObject {
    id: string;
    name: string;
    val: number;
}

interface GraphLink extends LinkObject {
    source: string;
    target: string;
}

export default function ChannelGraph() {
    const graphData: { nodes: GraphNode[], links: GraphLink[]} = {
        nodes: [
            {id:'id1', name: 'name1', val: 1},
            {id:'id2', name: 'name2', val: 2},
            {id:'id3', name: 'name3', val: 3}
        ],
        links: [
            {source: 'id1', target: 'id2'},
            {source: 'id2', target: 'id3'}
        ],
    };
    return (
        <div style={{width: '600px', height: '600px'}}>
            <ForceGraph3D
                graphData={graphData}
                nodeRelSize={8}
                nodeLabel="name"
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1.5}
            >
            </ForceGraph3D>
        </div>
    );
};