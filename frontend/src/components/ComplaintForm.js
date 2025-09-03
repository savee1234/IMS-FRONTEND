import React, { useState } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import './ComplainForm.css'; // Custom styling

function ComplaintForm() {
  const [mobileSearch, setMobileSearch] = useState('');
  const [contactExists, setContactExists] = useState(true);

  const handleSearch = () => {
    setContactExists(mobileSearch === '0771234567'); // Simulated check
  };

  return (
    <div className="page-center">
       <div className="form-wrapper">
      <h3 className="form-title text-center">Complaint Logging</h3>
      <div className="container">
       

        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="requestReference">
                <Form.Label>Request Reference</Form.Label>
                <Form.Control type="text" placeholder="Enter reference" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="categoryType">
                <Form.Label>Category Type</Form.Label>
                <Form.Select>
                  <option>Select Category</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="organization">
                <Form.Label>Organization</Form.Label>
                <Form.Select>
                  <option>Select Organization</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="solutionName">
                <Form.Label>Solution Name</Form.Label>
                <Form.Select>
                  <option>Select Solution</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="medium">
                <Form.Label>Medium</Form.Label>
                <Form.Select>
                  <option>Select Medium</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mediumSource">
                <Form.Label>Medium Source</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="complaint" className="mb-3">
            <Form.Label>Complaint</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <hr />
          <h5>Contact Person Details</h5>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Enter Mobile No"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={handleSearch}>Search</Button>
            </Col>
          </Row>

          {!contactExists && (
            <p className="text-danger">
              ** No contact person with that mobile number is found. Please insert details **
            </p>
          )}

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="contactName">
                <Form.Label>Contact Person Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="contactMobile">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="text" value={mobileSearch} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="officeMobile">
                <Form.Label>Office Mobile No</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Select>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
            </Form.Select>
          </Form.Group>

          <hr />
          <h5>Assignment</h5>

          <Table bordered responsive className="mb-3">
            <thead>
              <tr>
                <th>Emp No</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Availability</th>
                <th>Main Assignment</th>
                <th>Sub Assignment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Form.Control type="text" /></td>
                <td><Form.Control type="text" /></td>
                <td><Form.Control type="text" /></td>
                <td>
                  <Form.Select>
                    <option>Office</option>
                    <option>Roster</option>
                    <option>None</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select>
                    <option>Main Task</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select>
                    <option>Sub Task</option>
                  </Form.Select>
                </td>
              </tr>
            </tbody>
          </Table>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="documentReference">
                <Form.Label>Document Reference</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="documentSubject">
                <Form.Label>Document Subject</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="remarks" className="mb-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2">Reset</Button>
            <Button variant="primary">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default ComplaintForm;
