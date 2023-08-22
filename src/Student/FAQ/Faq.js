import React from "react";
import { Collapse } from 'antd';
import AuthLessNav from "../../Common/AuthLessNav/AuthLessNav.js";
// import "../../App"
import "./Faq.css"
import { Row, Col, Divider, Form, Input,  Button} from "antd";
import { useState } from "react";

const { TextArea } = Input;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};



const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];


 const Faq= ()=> {
  const onChange = (key) => {
    console.log(key);
  };
  const [form] = Form.useForm();
	// const [form2] = Form.useForm();
	// const [filelist, setFilelist] = useState([]);
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [batch, setbatch] = useState("");
	const [type, settype] = useState(0);
	const [roll_no, setroll_no] = useState("");
	const [textarea,settextarea]=useState("The Context of Query");


  return (
    <>
    <AuthLessNav ></AuthLessNav>
   <div className="acc-cont">
    <div className="accordion">
		<Divider orientation="left">Frequently Asked Question </Divider>
    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
    </div>
   </div>
   <div className="query_box">
   <div className="query_box1">
   <Divider orientation="left">Problem Still Not Resolved? </Divider>
      <div className="addinuser">
				<div className="inputele">
					<Form form={form}  autoComplete="off">
						<Row gutter={[32, 16]}>
							<Col span={12}>
              <Form.Item
									label={"Name"}
									name={"Name"}
									rules={[{ required: true }]}
								>
									<Input
										onChange={(e) => setname(e.target.value)}
									
										style={{ width: "100%" }}
										placeholder="Name"
									></Input>
							
								</Form.Item>

							</Col>
							<Col span={12}>
              <Form.Item
									label={"GCT Email"}
									name={"GCT Email"}
									rules={[{ required: true }]}
									>
									<Input
										onChange={(e) => setemail(e.target.value)}
										
										style={{ width: "100%" }}
										placeholder="something@gct.ac.in"
										></Input>
								</Form.Item>
							</Col>
							<Col span={12}>
              <Form.Item
									label={"Batch"}
									name={"Batch"}
									rules={[{ required: type != 0 ? false : true }, { len: 4 }]}
								>
									<Input
										disabled={type != 0 ? true : false}
										type="number"
										onChange={(e) => setbatch(e.target.value)}
										style={{ width: "100%" }}
										placeholder="Ex:2024,2025"
									></Input>
								</Form.Item>
								
							</Col>
							<Col span={12}>
              <Form.Item
									label={"Roll Numb"}
									name={"Roll Number"}
									rules={[{ required: type != 0 ? false : true }]}
								>
									<Input
										disabled={type != 0 ? true : false}
										onChange={(e) => setroll_no(e.target.value)}
										style={{ width: "100%" }}
										placeholder="Ex:2018118"
									></Input>
								</Form.Item>
							</Col>
							<Col span={24}>
              <Form.Item
									className="adjust"
									label={"Query"}
									name={"textbox"}
									rules={[{ required: type != 0 ? false : true }]}
								>
		
								  <TextArea
    						  showCount
    						  style={{ height: 120 ,
									width:"100%"}}
    						  onChange={onChange}
    						  placeholder="place ur query"
    							/>
								</Form.Item>
								
							</Col>
							<Col span={12}></Col>
						</Row>

						<Form.Item>
							<div className="addindibtn">
								<Button htmlType="reset">Reset</Button>
								<div style={{ width: "10px" }}></div>
								<Button htmlType="submit" type="primary" >
								Contact
							  </Button>
							</div>
						</Form.Item>
					</Form>
					{/* <Form form={form} autoComplete="off">
  <Row gutter={[32, 24]}>
    <Col span={24}>
      <Form.Item label={"Name"} name={"Name"} rules={[{ required: true }]}>
        <Input
          onChange={(e) => setname(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Name"
        />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item
        label={"GCT Email"}
        name={"GCT Email"}
        rules={[{ required: true }]}
      >
        <Input
          onChange={(e) => setemail(e.target.value)}
          style={{ width: "100%" }}
          placeholder="something@gct.ac.in"
        />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item
        label={"Batch"}
        name={"Batch"}
        rules={[{ required: type !== 0 }, { len: 4 }]}
      >
        <Input
          disabled={type !== 0}
          type="number"
          onChange={(e) => setbatch(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Ex: 2024, 2025"
        />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item
        label={"Roll Number"}
        name={"Roll Number"}
        rules={[{ required: type !== 0 }]}
      >
        <Input
          disabled={type !== 0}
          onChange={(e) => setroll_no(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Ex: 2018118"
        />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item
        label={"Brief Your Query"}
        name={"textbox"}
        rules={[{ required: type !== 0 }]}
      >
        <TextArea
          showCount
          style={{ height: 120, width: "100%" }}
          onChange={onChange}
          placeholder="Place your query"
        />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item>
        <div className="addindibtn">
          <Button htmlType="reset">Reset</Button>
          <div style={{ width: "10px" }}></div>
          <Button htmlType="submit" type="primary">
            Contact
          </Button>
        </div>
      </Form.Item>
    </Col>
  </Row>
					</Form> */}

				</div>
			</div>
    </div>
   </div>

    </>

  ) 

 }
 export default Faq;

