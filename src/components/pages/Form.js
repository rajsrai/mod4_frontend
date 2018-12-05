import React, { Component } from 'react'



class Form extends Component {
  state = {
    title: "",
    date: null,
    description: ""


  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

onSubmitHandler = (e, info) => {
  e.preventDefault()
  this.props.moment(info)
  // fetch('http://localhost:3001/moments', {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     title: info.title,
  //     description: info.description,
  //     date: info.date,
  //     location: info.location,
  //     user_id: 1
  //   })
  // })

}

  render() {
    return (
    <form onSubmit={(e) => this.onSubmitHandler(e, this.state)}>
      <input type="text" name="title" placeholder="Title" onChange={this.changeHandler}/>
      <br></br>
      <input type="date" name="date" placeholder="Date" onChange={this.changeHandler}/>
      <br></br>
      <textarea name="description" placeholder="Description" onChange={this.changeHandler}/>
      <br></br>
      <h3>Location</h3>
      <br></br>
      <textarea name="location" placeholder="Location" onChange={this.changeHandler}/>
      <button>Submit</button>

    </form>
  )
  }
}


export default Form;
