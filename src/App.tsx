import React, { useState } from "react";
import {
    Row,
    Col,
    Form,
    Card,
    Spinner,
    Alert,
} from "react-bootstrap";
import HighlightByType from "./HighlightByType.tsx";
import {useEntityAnalysis} from "../hooks/useEntityAnalysis.ts";
import {generateColor} from "../utils/colors.ts";
import EntityCharts from "../components/EntityCharts.tsx";


// -----------------------------
// Main Component
// -----------------------------

export default function App() {
    const [lines, setLines] = useState<string[]>([]);                                       // file lines
    const { counts, entitiesByLine, loading, error, processFile } = useEntityAnalysis()     // analysis hook
    const [selectedType, setSelectedType] = useState<string | null>(null);                  // active filter

    const types = Object.keys(counts);

    // create color for each entity type
    const colorMap: Record<string,string> = {};
    types.forEach((type, idx) => {
        colorMap[type] = generateColor(idx, types.length);
    });

    // read and process file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async () => {
            const content = reader.result as string;
            const fileLines = content.split(/\r?\n/).filter(Boolean);
            setLines(fileLines);
            await processFile(fileLines);
        };
        reader.readAsText(file);
    };

    const chartData = Object.entries(counts).map(([type, value]) => ({
        type,
        value,
    }));


    return (
        <div className="py-4 container-fluid">
            <Row className="mb-4">
                <Col>
                    <h2>SentiSquare Dashboard</h2>
                    <p className="text-muted">
                        Import a TXT file with English sentences. Each line is processed by
                        TextRazor (via your proxy) to extract named entities.
                    </p>
                </Col>
            </Row>

            <Form.Group controlId="fileUpload" className="mb-4">
                <Form.Control type="file" accept=".txt" onChange={handleFileChange} />
            </Form.Group>

            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" role="status" />
                    <div>Processing…</div>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {/* charts summary */}
            {!!chartData.length && (
                <EntityCharts
                    chartData={chartData}
                    colorMap={colorMap}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />            )}

            {/* display each line with highlighting */}
            {lines.map((line, idx) => (
                <Card key={idx} className="mb-2">
                    <Card.Body>
                        <HighlightByType
                            line={line}
                            entities={entitiesByLine[idx] || []}
                            colorMap={colorMap}
                            selectedType={selectedType}
                            onSelectType={setSelectedType}
                        />
                    </Card.Body>

                </Card>
            ))}
        </div>
    );
}
