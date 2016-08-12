<?php

	class Pub
	{
		public function __construct()
		{
			echo 'pub stuff';
			$this->db = new Database();
		}
		
		public function extra()
		{
			echo ', ya blah';
			$this->db->connect();
			$this->db->sql('select * from twitter_accounts where bad_account_flag = 0 order by id desc limit 5');
			$res = $this->db->getResult();
			print_r($res);
		}
	}