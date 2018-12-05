import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';



class Timeline extends Component {

  state = {
    imageArray: []
  }

  imageSubmit = (mom) => {

    var myUploadWidget;
     // document.getElementById("upload_widget_opener").addEventListener("click", function() {
    myUploadWidget = window.cloudinary.openUploadWidget({
      cloudName: 'dhtrapttx',
      uploadPreset: 'ajr9rptq'}, (error, result) => {
    this.uploadImage(result, mom)});
    // });
  }

  uploadImage = (result, mom) => {
    console.log("result", result)

    if (result.event === "success") {
      fetch('http://localhost:3001/pictures', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title: result.info.secure_url,
          comment: "",
          date: null,
          moment_id: mom

        })
      }).then(res => res.json())
      .then(data => {
        this.setState({
          imageArray: [...this.state.imageArray, data]

        })
      })
    }
  }


  componentDidMount() {
    fetch('http://localhost:3001/pictures')
    .then(response => response.json())
    .then(data => {
      this.setState({
          imageArray: data
      })
    })
}


  allImages = (id) => {
    let copyArray = [...this.state.imageArray].filter(img =>  img.moment_id === id)

     return copyArray.map(image => {
      return <img src={image.title} alt="hope it works" />
    })

  }

  allMoments = () => {

    return this.props.momentInfo.map(mom => {
      console.log(mom.date)
      return   <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={mom.date}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon=" "
                >
        Moment Title:<h4 className="vertical-timeline-element-title">{mom.title}</h4>
        Moment Description:<h4 className="vertical-timeline-element-subtitle">{mom.description}</h4>
      Moment location:<h4 className="vertical-timeline-element-subtitle">{mom.location}</h4>
        {this.allImages(mom.id)}
        <p>

        </p>
        <CloudinaryContext cloudName="dhtrapttx">
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        <script>cloudinary.setCloudName(dhtrapttx);</script>
        <a href="#" id="upload_widget_opener" onClick={() => this.imageSubmit(mom.id)}>Upload multiple images</a>

        </CloudinaryContext>

        </VerticalTimelineElement>
        </VerticalTimeline>
    })
  }


render() {

  return(
  <div>
    {this.allMoments()}
  </div>



)}

}

export default Timeline;
