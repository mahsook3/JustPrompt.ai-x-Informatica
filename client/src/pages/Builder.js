import React, { useState } from "react";
import Questionnaire from "../Builder/Questionnaire";
import SelectedComponents from "../Builder/SelectedComponents";
import ComponentResult from "../Builder/ComponentResult";
import DragAndDrop from "../Builder/DragAndDrop";
import FinalDisplay from "../Builder/FinalDisplay";

const Builder = () => {
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [droppedComponents, setDroppedComponents] = useState([]);

  const handleQuestionnaireSubmit = (data) => {
    setQuestionnaireData(data);
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
<div className="flex h-screen overflow-hidden">
    <div className="flex-1 flex flex-col">
        <div className="container mx-auto p-4 flex-1 overflow-hidden">
            {!questionnaireData ? (
                <Questionnaire onSubmit={handleQuestionnaireSubmit} />
            ) : (
                <div className="grid grid-cols-10 gap-4 h-full">
                    <div className="col-span-1 p-2 h-full overflow-y-auto">
                        <SelectedComponents
                            components={questionnaireData.selectedComponents || []}
                            onComponentClick={handleComponentClick}
                        />
                    </div>
                    <div className="col-span-2 p-2 h-full overflow-y-auto">
                        {selectedComponent && (
                            <ComponentResult
                                query={selectedComponent}
                                setDroppedComponents={setDroppedComponents}
                            />
                        )}
                    </div>
                    <div className="col-span-2 p-2 h-full overflow-y-auto">
                        <DragAndDrop
                            components={questionnaireData.selectedComponents || []}
                            droppedComponents={droppedComponents}
                            setDroppedComponents={setDroppedComponents}
                        />
                    </div>
                    <div className="col-span-5 p-2 h-full overflow-y-auto">
                        <FinalDisplay droppedComponents={droppedComponents} />
                    </div>
                </div>
            )}
        </div>
    </div>
</div>
  );
};

export default Builder;
