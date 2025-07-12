'use client'
import dynamic from 'next/dynamic';
import React from 'react';
import type {
    ForceGraphMethods,
    NodeObject,
    LinkObject,
} from 'react-force-graph-3d';
const ForceGraph3D = dynamic(
  () => import('react-force-graph-3d').then((mod) => mod.default),
  { ssr: false }
);

interface GraphNode extends NodeObject {
    id: string;
    name: string;
    val: number;
}

interface GraphLink extends LinkObject {
    source: string;
    target: string;
}


const dummyGraphData: { nodes: GraphNode[], links: GraphLink[]} = {
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

export default function ChannelGraph() {
    // retrieve channel coord data
    const response = fetch("http://localhost:8000/channels");
    console.log(`The response = ${response}`);


    return (
        <div style={{width: '600px', height: '600px'}}>
            <ForceGraph3D
                graphData={dummyGraphData}
                nodeRelSize={8}
                nodeLabel="name"
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1.5}
            >
            </ForceGraph3D>
        </div>
    );
};