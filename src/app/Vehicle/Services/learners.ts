const learners = [
    {
        name: "bhargav",
        userName: "bhargav@gmail.com",
        purchasedCourses: []
    },
    {
        name: "neeraja",
        userName: "neeraja@gmail.com",
        purchasedCourses: []
    },
    {
        name: "surya",
        userName: "surya@gmail.com",
        purchasedCourses: []
    },
    {
        name: "pravalika",
        userName: "pravalika@gmail.com",
        purchasedCourses: []
    },
    {
        name: "kiran",
        userName: "kiran@gmail.com",
        purchasedCourses: []
    },
    {
        name: "prashanth",
        userName: "prashanth@gmail.com",
        purchasedCourses: []
    },
    {
        name: "phani",
        userName: "phani@gmail.com",
        purchasedCourses: []
    },
    {
        name: "sasi",
        userName: "sasi@gmail.com",
        purchasedCourses: []
    }
]

const courses = [
    {
      "course_id": "course_001",
      "title": "Angular",
      "description": "This comprehensive course on Angular covers all fundamental and advanced topics, ensuring a solid understanding of this powerful framework. The course starts with the basics and gradually delves into advanced concepts, helping you become proficient in Angular development.",
      "price": 12.99
    },
    {
      "course_id": "course_002",
      "title": "Signals",
      "description": "Learn about Signals, their applications, and how to effectively use them in modern software development. This course offers practical examples and exercises to enhance your understanding of signal processing and implementation.",
      "price": 13.49
    },
    {
      "course_id": "course_003",
      "title": "NgRx",
      "description": "Master NgRx, the popular state management library for Angular. This course guides you through its core principles, best practices, and advanced techniques, equipping you with the skills to manage state in large-scale Angular applications.",
      "price": 11.99
    },
    {
      "course_id": "course_004",
      "title": "Rxjs",
      "description": "Explore the power of RxJS in this course, covering its operators, observables, and how to effectively use them to manage asynchronous operations in JavaScript applications. Practical examples and exercises are included.",
      "price": 10.99
    },
    {
      "course_id": "course_005",
      "title": "Jasmine",
      "description": "Become proficient in Jasmine, the popular JavaScript testing framework. This course covers all aspects of Jasmine, from basic to advanced testing techniques, helping you write robust and reliable tests for your applications.",
      "price": 9.99
    },
    {
      "course_id": "course_006",
      "title": "React",
      "description": "This course on React provides a thorough understanding of React development, from basic concepts to advanced topics. Learn how to build dynamic and interactive user interfaces with React.",
      "price": 12.49
    },
    {
      "course_id": "course_007",
      "title": "React 19",
      "description": "Stay updated with the latest features of React 19. This course covers new functionalities, best practices, and how to leverage them to improve your React applications.",
      "price": 13.99
    },
    {
      "course_id": "course_008",
      "title": "Redux",
      "description": "Master Redux, the state management library for JavaScript applications. This course covers its principles, implementation, and advanced techniques to manage application state effectively.",
      "price": 11.49
    },
    {
      "course_id": "course_009",
      "title": "MongoDB",
      "description": "Learn MongoDB, the popular NoSQL database. This course covers data modeling, CRUD operations, aggregation, and indexing, providing a solid foundation for working with MongoDB.",
      "price": 10.49
    },
    {
      "course_id": "course_010",
      "title": "Express",
      "description": "Get started with Express, the fast, unopinionated, minimalist web framework for Node.js. This course covers routing, middleware, and building RESTful APIs with Express.",
      "price": 9.99
    },
    {
      "course_id": "course_011",
      "title": "Node Js",
      "description": "This comprehensive course on Node.js covers all fundamental and advanced topics, ensuring a solid understanding of this powerful runtime. The course starts with the basics and gradually delves into advanced concepts.",
      "price": 12.99
    },
    {
      "course_id": "course_012",
      "title": "Spring",
      "description": "Learn Spring Framework, the powerful framework for Java development. This course covers core Spring concepts, dependency injection, Spring MVC, and more, helping you build robust Java applications.",
      "price": 14.99
    },
    {
      "course_id": "course_013",
      "title": "Azure",
      "description": "Master Microsoft Azure with this course. It covers cloud computing concepts, Azure services, and how to deploy and manage applications on the Azure platform.",
      "price": 13.49
    },
    {
      "course_id": "course_014",
      "title": "Aws",
      "description": "Become proficient in Amazon Web Services (AWS) with this course. Learn about various AWS services, cloud computing fundamentals, and how to deploy and manage applications on AWS.",
      "price": 11.99
    },
    {
      "course_id": "course_015",
      "title": "Docker",
      "description": "Learn Docker, the platform for developing, shipping, and running applications in containers. This course covers Docker basics, Docker Compose, and how to manage containers effectively.",
      "price": 10.99
    },
    {
      "course_id": "course_016",
      "title": "RDBMS",
      "description": "This course on Relational Database Management Systems (RDBMS) covers data modeling, SQL, and how to design and manage relational databases effectively.",
      "price": 9.99
    },
    {
      "course_id": "course_017",
      "title": "Big-Data",
      "description": "Explore Big Data concepts and technologies in this course. Learn about Hadoop, Spark, and how to process and analyze large datasets effectively.",
      "price": 12.99
    },
    {
      "course_id": "course_018",
      "title": ".NET",
      "description": "Master .NET framework with this course. It covers core .NET concepts, ASP.NET, and how to build robust applications using the .NET framework.",
      "price": 14.49
    },
    {
      "course_id": "course_019",
      "title": "Git",
      "description": "Learn Git, the popular version control system. This course covers Git basics, branching, merging, and how to manage your codebase effectively with Git.",
      "price": 10.49
    },
    {
      "course_id": "course_020",
      "title": "Jira",
      "description": "Get started with Jira, the project management tool. This course covers Jira basics, project setup, and how to manage tasks and projects effectively with Jira.",
      "price": 9.99
    },
    {
      "course_id": "course_021",
      "title": "Jenkins",
      "description": "Learn Jenkins, the popular automation server. This course covers Jenkins setup, pipeline creation, and how to automate your CI/CD processes with Jenkins.",
      "price": 11.99
    },
    {
      "course_id": "course_022",
      "title": "Cypress",
      "description": "Become proficient in Cypress, the end-to-end testing framework. This course covers Cypress basics, writing tests, and how to automate testing for your applications.",
      "price": 12.49
    },
    {
      "course_id": "course_023",
      "title": "Selenium",
      "description": "Master Selenium, the browser automation tool. This course covers Selenium basics, writing automation scripts, and how to test web applications effectively with Selenium.",
      "price": 13.99
    }
]

