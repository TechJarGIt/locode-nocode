import { useCallback, useRef } from "react";
import { ReactFlow, addEdge, Background, Controls, Handle, Position, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { componentsMap } from "./componentsMap";

// A static custom node type with top & bottom handles
const CustomNode = ({ data }) => {
    const Component = data?.component;
    if (!Component) {
        return (
            <div className="p-2 border rounded bg-red-100 text-red-500">
                Error: Invalid Component
            </div>
        );
    }
    return (
        <div className="bg-white shadow">
            <Handle type="target" position={Position.Top} />
            <Component />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

export default function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const canvasRef = useRef(null);

    const onConnect = useCallback((connection) => {
        setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    }, [setEdges]);

    const handleDrop = (e) => {
        e.preventDefault();
        const componentKey = e.dataTransfer.getData("component");

        if (!componentsMap[componentKey]) {
            console.error("Invalid component dropped:", componentKey);
            return;
        }

        // Get canvas bounds for accurate positioning
        const canvasBounds = canvasRef.current?.getBoundingClientRect();
        if (!canvasBounds) return;

        const newNode = {
            id: `${componentKey}-${Date.now()}`, // More descriptive unique id
            type: "custom",
            position: {
                // Calculate position relative to canvas
                x: e.clientX - canvasBounds.left,
                y: e.clientY - canvasBounds.top,
            },
            data: {
                component: componentsMap[componentKey],
                label: componentKey, // Add label for debugging
            },
        };

        setNodes((nds) => [...nds, newNode]);
    };

    return (
        <div
            ref={canvasRef}
            className="w-full min-h-[85vh] p-2 m-2 border-2 border-blue-500 rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}>

            <h2 className="text-2xl bg-gray-50 p-1 rounded-xl mb-4">Canvas</h2>
            <div className="h-[78vh] w-full">
                <ReactFlow
                    className="border-2 border-red-500 rounded-lg"
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}>

                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
};
