<?php

	class Home
	{
		public function __construct()
		{
			$this->db = new Database();
			$this->help = new Help();
		}
		
		public function extra()
		{
			echo ', ya blah';
		}
		
		public function signup()
		{
			
			if($this->help->posted('survey')){
				//$info = $this->help->posted();
				//$this->db->connect();
				//$info = $this->db->escapeString($info);
				/*
				$validate = new ValidFluent($info);
				$validate->name('first_name')->required('You must chose a first name!')->alfa()->minSize(2);
				$validate->name('last_name')->required('You must chose a last name!')->alfa()->minSize(2);
				$validate->name('email')->required()->email();
				if ($validate->isGroupValid()) echo 'Validation Passed!';
				} else{
					$this->help->view('signup', array('valid'=>$validate->validObjs));
				}
				*/
				
				if(($info['first_name'] != '') 
					&& ($info['last_name'] != '')
					&& ($info['email'] != '')
					&& ($info['cellphone'] != '')
					&& ($info['class'] != '')
					&& ($info['activity'] != '')
					&& ($info['years_xp'] != '')
					&& ($info['weekday'] != '')
				) {
					$this->db->insert('sodexo', $info);
					$this->help->view('signup', array('success'=>true));
				} else 
					$this->help->view('signup', array('fail'=>true, 'info'=>$info));
			
			} else {
				$this->help->view('signup');
			}
		}
		
		public function survey()
		{
			$info = $this->help->posted();
			$this->db->connect();
			$info = $this->db->escapeString($info);
			
			if($this->help->posted('survey')){
				if($info['resident'] != '') {
					$this->db->insert('sodexo', $info);
					//print_r($info);
					$this->help->view('signup', array('success'=>true));
					
				} else 
					$this->help->view('signup', array('fail'=>true, 'info'=>$info));
			} else {
				$this->help->view('signup');
			}
		}
		
		
	}