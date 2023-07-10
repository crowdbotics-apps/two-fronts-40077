import React from "react"
import { Button, Col, Form, Row, Card } from "react-bootstrap"

import { ALLICONS } from "../../assets"
import AppFormSelect from "../../components/form/select"
import { useApplicationContext } from "./context/application-context"
import { ApplicationItemContextProvider } from "./context/application-item-context"
import { APPCONFIG } from "../../app-config"

const ApplicationQuestionItem = ({
  applicationIndex,
  applicationItemData = {},
  onDelete,
  handleInputChange
}) => {
  const {} = useApplicationContext()

  const {} = applicationItemData

  const handleDeleteRole = () => {
    onDelete() // Call the onDelete function from the parent component
  }

  return (
    <ApplicationItemContextProvider>
      <Card className="application-question-item p-3">
        <div className="application-item">
          <div className="application-item-contents-wrap">
            <Row className="justify-content-end">
              <Col xs="auto"></Col>
            </Row>
            <Form.Group className="d-flex flex-column">
              <Button
                variant="link"
                className="btn-delete p-0 h-auto"
                title="Delete question"
                onClick={handleDeleteRole}
              >
                <ALLICONS.Delete />
              </Button>
              <Form.Label className="d-flex align-item-start mb-3">
                Question {applicationIndex + 1}
              </Form.Label>
              <Form.Control
                name={`question`}
                value={applicationItemData?.question}
                onChange={event => {
                  handleInputChange("question", event?.target?.value)
                }}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <Form.Label className="d-flex align-item-start mb-2 mt-3">
                Answer Type
              </Form.Label>
              <AppFormSelect
                ariaLabel="Answer Type"
                className="answer-type-selector"
                name={`application-answer-type`}
                options={APPCONFIG.selectOptionsAnswerType}
                selectedItem={applicationItemData?.answer_type || ""}
                onChangeCallback={event => {
                  handleInputChange("answer_type", event?.target?.value)
                }}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <Form.Label className="d-flex align-item-start mb-2 mt-3">
                Question required
              </Form.Label>
              <AppFormSelect
                ariaLabel="Question required"
                className="answer-type-selector"
                name={`application-answer-type`}
                options={APPCONFIG.selectOptionsYesNo}
                selectedItem={applicationItemData?.question_required === true}
                onChangeCallback={event => {
                  handleInputChange("question_required", event?.target?.value)
                }}
              />
            </Form.Group>
          </div>
        </div>
      </Card>
    </ApplicationItemContextProvider>
  )
}
export default ApplicationQuestionItem
