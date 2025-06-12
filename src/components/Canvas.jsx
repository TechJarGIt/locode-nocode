import { useState, useCallback, useRef } from "react";
import { ReactFlow, addEdge, Background, Controls, Handle, Position, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { componentsMap } from "./componentsMap";

// A static custom node type with top & bottom handles
const CustomNode = ({ data }) => {
    const Component = data?.component;
    // Handle error state
    if (data?.error) {
        return (
            <div className="p-2 border rounded bg-yellow-100 text-yellow-700 border-yellow-300">
                <div className="text-xs font-semibold">Missing Component</div>
                <div className="text-xs">{data.error}</div>
            </div>
        );
    }
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
    const [workflowName, setWorkflowName] = useState('');
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

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
                componentKey: componentKey, // Store the key for export
            },
        };

        setNodes((nds) => [...nds, newNode]);
    };

    // Export workflow as JSON
    const exportWorkflow = () => {
        const workflow = {
            name: workflowName || 'Untitled Workflow',
            timestamp: new Date().toISOString(),
            nodes: nodes.map(node => ({
                ...node,
                // Only store the component key, not the actual component
                data: {
                    ...node.data,
                    component: undefined, // Remove component reference
                    componentKey: node.data.componentKey || node.data.label
                }
            })),
            edges: edges
        };

        const dataStr = JSON.stringify(workflow, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `${workflow.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };
    // Import workflow from JSON
    const importWorkflow = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workflow = JSON.parse(e.target.result);

                // Validate workflow structure
                if (!workflow.nodes || !workflow.edges) {
                    alert('Invalid workflow file format');
                    return;
                }

                // Restore nodes with components
                const restoredNodes = workflow.nodes.map(node => {
                    const componentKey = node.data.componentKey || node.data.label;
                    const component = componentsMap[componentKey];

                    if (!component) {
                        console.warn(`Component "${componentKey}" not found in componentsMap`);
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                component: null,
                                error: `Component "${componentKey}" not found`
                            }
                        };
                    }

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            component: component,
                            componentKey: componentKey
                        }
                    };
                });

                setNodes(restoredNodes);
                setEdges(workflow.edges);
                setWorkflowName(workflow.name || 'Imported Workflow');

                console.log('Workflow imported successfully:', workflow.name);
            } catch (error) {
                console.error('Error importing workflow:', error);
                alert('Error importing workflow. Please check the file format.');
            }
        };

        reader.readAsText(file);
        // Reset file input
        event.target.value = '';
    };
    // Clear workflow
    const clearWorkflow = () => {
        if (nodes.length > 0 || edges.length > 0) {
            if (window.confirm('Are you sure you want to clear the current workflow?')) {
                setNodes([]);
                setEdges([]);
                setWorkflowName('');
            }
        }
    };

    return (
        <div
            ref={canvasRef}
            className="w-full min-h-[85vh] p-2 m-2 border-2 border-blue-500 rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}>

            {/* Header with workflow controls */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl bg-gray-50 p-1 rounded-xl">Canvas</h2>

                <div className="flex items-center gap-4">                    
                    <input
                        type="text"
                        placeholder="Workflow name"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                    />

                    {/* Import Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 bg-green-400 text-white rounded-md hover:bg-green-500 text-sm">
                        Import
                    </button>

                    {/* Export Button */}
                    <button
                        onClick={exportWorkflow}
                        disabled={nodes.length === 0}
                        className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm">
                        Export
                    </button>

                    {/* Clear Button */}
                    <button
                        onClick={clearWorkflow}
                        className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 text-sm">
                        Clear
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={importWorkflow}
                        accept=".json"
                        style={{ display: 'none' }}
                    />
                </div>
            </div>

            {/* Workflow Stats */}
            {(nodes.length > 0 || edges.length > 0) && (
                <div className="mb-2 text-sm text-gray-600">
                    Components: {nodes.length} | Connections: {edges.length}
                    {workflowName && ` | Name: ${workflowName}`}
                </div>
            )}
            
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
